import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
      const item2 = window.localStorage.getItem(key);
      return item2 !== null ? JSON.parse(item2) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const setLocalStorage = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setLocalStorage];
}
