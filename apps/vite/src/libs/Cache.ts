/* eslint-disable padding-line-between-statements */
type CacheItem<T> = {
  value: T;
  expiry: number | null;
};

const setItem = <T>(key: string, value: T, expiryInSeconds?: number): void => {
  const expiry = expiryInSeconds ? Date.now() + expiryInSeconds * 1000 : null;
  const item: CacheItem<T> = { value, expiry };
  localStorage.setItem(key, JSON.stringify(item));
};

const getItem = <T>(key: string): T | null => {
  const itemString = localStorage.getItem(key);
  if (!itemString) {
    return null;
  }
  try {
    const item: CacheItem<T> = JSON.parse(itemString);
    if (item.expiry !== null && item.expiry < Date.now()) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {
    localStorage.removeItem(key);
    return null;
  }
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

const clearExpiredItems = (): void => {
  Object.keys(localStorage).forEach((key) => {
    getItem(key); // this will remove expired items
  });
};

const clearAllItems = (): void => {
  localStorage.clear();
};

export { setItem, getItem, removeItem, clearExpiredItems, clearAllItems };
