export const saveToLocalStorage = <T = any>(key: string, value: T): void => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

export const getFromLocalStorage = <T = any>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};
