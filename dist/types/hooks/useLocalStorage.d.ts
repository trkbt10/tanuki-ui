export declare const useLocalStorage: <T>(key: string, initialValue: T) => readonly [T, (value: T | ((val: T) => T)) => void];
