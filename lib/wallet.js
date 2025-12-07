/**
 * Wallet helper utilities.
 * These functions expect a storage layer to be provided by the caller.
 */

const WALLET_STORE_KEY = '__domax_wallet_storage__'

const walletBlueprints = {
  'wallet:teacher:personal': {
    id: 'wallet:teacher:personal',
    ownerType: 'teacher',
    ownerRef: 'teacher:demo',
    currency: 'NGN',
    pages: 4800,
    pricePerPage: 45,
    lowPagesThreshold: 1200,
    label: 'Personal wallet',
    lastCreditAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    minimumPurchasePages: 250,
  },
  'wallet:school:kigali': {
    id: 'wallet:school:kigali',
    ownerType: 'school',
    ownerRef: 'KIG-001',
    currency: 'NGN',
    pages: 18800,
    pricePerPage: 38,
    lowPagesThreshold: 5000,
    label: 'Kigali STEM shared wallet',
    lastCreditAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    minimumPurchasePages: 1000,
  },
  'wallet:school:lagos': {
    id: 'wallet:school:lagos',
    ownerType: 'school',
    ownerRef: 'STEM-201',
    currency: 'NGN',
    pages: 7200,
    pricePerPage: 40,
    lowPagesThreshold: 2500,
    label: 'STEM Nation shared wallet',
    lastCreditAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    minimumPurchasePages: 750,
  },
  'wallet:institution:nec': {
    id: 'wallet:institution:nec',
    ownerType: 'institution',
    ownerRef: 'NEC-RW',
    currency: 'EUR',
    pages: 120000,
    pricePerPage: 0.35,
    lowPagesThreshold: 20000,
    label: 'NEC Rwanda treasury',
    lastCreditAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    minimumPurchasePages: 5000,
  },
}

function cloneWallet(wallet) {
  return JSON.parse(JSON.stringify(wallet))
}

function getDefaultStorage() {
  if (!globalThis[WALLET_STORE_KEY]) {
    const wallets = new Map()
    const purchases = new Map()
    const auditLogs = []
    const consumptionLogs = []

    const ensureWallet = (walletId) => {
      if (!wallets.has(walletId)) {
        const blueprint = walletBlueprints[walletId]
        if (blueprint) {
          wallets.set(walletId, cloneWallet(blueprint))
        } else {
          wallets.set(walletId, {
            id: walletId,
            ownerType: 'personal',
            ownerRef: walletId,
            currency: 'NGN',
            pages: 0,
            pricePerPage: 40,
            lowPagesThreshold: 500,
            label: walletId,
            minimumPurchasePages: 250,
          })
        }
      }
      return wallets.get(walletId)
    }

    Object.keys(walletBlueprints).forEach((walletId) => ensureWallet(walletId))

    const storage = {
      wallets: {
        ensure(walletId) {
          return ensureWallet(walletId)
        },
        async credit(walletId, amountPages, metadata = {}) {
          const wallet = ensureWallet(walletId)
          wallet.pages += amountPages
          wallet.lastCreditAt = new Date().toISOString()
          auditLogs.push({
            type: 'wallet.credit',
            walletId,
            amountPages,
            metadata,
            createdAt: new Date().toISOString(),
          })
        },
        async consume(walletId, pagesNeeded, metadata = {}) {
          const wallet = ensureWallet(walletId)
          if (wallet.pages < pagesNeeded) {
            return { success: false, balance: wallet.pages }
          }
          wallet.pages -= pagesNeeded
          wallet.lastConsumptionAt = new Date().toISOString()
          auditLogs.push({
            type: 'wallet.consume',
            walletId,
            pages: pagesNeeded,
            metadata,
            createdAt: new Date().toISOString(),
          })
          consumptionLogs.push({
            walletId,
            pages: pagesNeeded,
            metadata,
            createdAt: new Date().toISOString(),
          })
          return { success: true, balance: wallet.pages }
        },
        snapshot() {
          return Array.from(wallets.values()).map((wallet) => cloneWallet(wallet))
        },
      },
      purchases: {
        create(purchase) {
          purchases.set(purchase.id, purchase)
        },
        update(id, updates) {
          const current = purchases.get(id)
          if (!current) return
          purchases.set(id, { ...current, ...updates })
        },
        get(id) {
          return purchases.get(id)
        },
      },
      consumptionLogs: {
        insert(entry) {
          consumptionLogs.push(entry)
        },
        all() {
          return consumptionLogs
        },
      },
      audit: {
        log(entry) {
          auditLogs.push(entry)
        },
        all() {
          return auditLogs
        },
      },
    }

    globalThis[WALLET_STORE_KEY] = storage
  }
  return globalThis[WALLET_STORE_KEY]
}

export async function creditWallet({ walletId, amountPages, metadata = {}, storage }) {
  const activeStorage = storage || getDefaultStorage()
  await activeStorage.wallets.credit(walletId, amountPages, metadata)
}

export async function consumePages({ walletId, pagesNeeded, metadata = {}, storage }) {
  const activeStorage = storage || getDefaultStorage()
  const result = await activeStorage.wallets.consume(walletId, pagesNeeded, metadata)
  if (!result?.success) {
    throw new Error('INSUFFICIENT_CREDITS')
  }
  return result
}

export async function logConsumption({ walletId, submissionId, pages, metadata = {}, storage }) {
  const activeStorage = storage || getDefaultStorage()
  await activeStorage.consumptionLogs.insert({
    walletId,
    submissionId,
    pages,
    metadata,
    createdAt: new Date().toISOString(),
  })
}

export function getWalletStorage() {
  return getDefaultStorage()
}

export function ensureWallet(walletId, storage) {
  const activeStorage = storage || getDefaultStorage()
  activeStorage.wallets.ensure(walletId)
  return activeStorage.wallets
}

