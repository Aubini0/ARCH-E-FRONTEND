import { useState } from "react";

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;
type ClearValue = () => void;
type HasValue = () => boolean | undefined;

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, ClearValue, HasValue] {
  // Get the value from localStorage or set it to the initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update the value in localStorage whenever storedValue changes
  const setValue: SetValue<T> = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      setStoredValue(newValue);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Remove the key from localStorage
  const clearValue: ClearValue = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Check if the key exists in localStorage
  const hasValue: HasValue = () => {
    try {
      if (typeof window !== "undefined") {
        return window.localStorage.getItem(key) !== null;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return [storedValue, setValue, clearValue, hasValue];
}

export default useLocalStorage;
