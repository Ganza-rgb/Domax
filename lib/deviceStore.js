'use client'

/*
 * Page photos kept on this device (IndexedDB), so capture keeps working with
 * no connection and survives a reload. Nothing here is uploaded: the
 * prototype has no server storage yet.
 */
const DB_NAME = 'domax-device'
const STORE = 'pages'

let dbPromise = null

function openDb() {
  if (typeof indexedDB === 'undefined') return Promise.reject(new Error('This browser cannot store pages offline.'))
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1)
      request.onupgradeneeded = () => request.result.createObjectStore(STORE)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  return dbPromise
}

function run(mode, action) {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, mode)
        const request = action(tx.objectStore(STORE))
        tx.oncomplete = () => resolve(request?.result)
        tx.onerror = () => reject(tx.error)
      })
  )
}

export const putPage = (key, blob) => run('readwrite', (store) => store.put(blob, key))
export const getPage = (key) => run('readonly', (store) => store.get(key))
export const deletePage = (key) => run('readwrite', (store) => store.delete(key))
