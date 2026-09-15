/**
 * Simple in-memory cache — acts as the ISR layer.
 * The cache is populated on first request and busted when admin hits /api/revalidate.
 * TTL = 1 hour as a safety net (auto-refresh even without manual revalidation).
 */

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const store = new Map();

export function cacheGet(key) {
    const entry = store.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > CACHE_TTL_MS) {
        store.delete(key);
        return null;
    }
    return entry.data;
}

export function cacheSet(key, data) {
    store.set(key, { data, ts: Date.now() });
}

export function cacheDelete(key) {
    store.delete(key);
}

export function cacheClear() {
    store.clear();
}

export function cacheKeys() {
    return [...store.keys()];
}
