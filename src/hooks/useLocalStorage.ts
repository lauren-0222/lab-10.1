import { useEffect, useState } from "react";

/**
 * Custom hook: useLocalStorage
 * Works like useState, but syncs with localStorage.
 *
 * @param key   
 * @param initialValue   
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

 
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
     
    }
  }, [key, value]);

  return [value, setValue] as const;
}