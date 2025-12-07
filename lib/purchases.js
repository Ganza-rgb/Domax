import { getWalletStorage } from './wallet'

export function createPendingPurchase({ id, buyerId, walletId, amountRwf, pagesCredited, provider, metadata }) {
  const storage = getWalletStorage()
  const record = {
    id,
    buyerId,
    walletId,
    provider,
    providerReference: null,
    amountRwf,
    pagesCredited,
    status: 'pending',
    metadata,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  storage.purchases.create(record)
  return record
}

export function markPurchaseCompleted(id, updates = {}) {
  const storage = getWalletStorage()
  const record = storage.purchases.get(id)
  if (!record) return null
  storage.purchases.update(id, {
    ...updates,
    status: 'completed',
    updatedAt: new Date().toISOString(),
  })
  return storage.purchases.get(id)
}

export function findPurchase(id) {
  const storage = getWalletStorage()
  return storage.purchases.get(id)
}









