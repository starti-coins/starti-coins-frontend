type StorageKeys = "account" | "token" | "sidebar_state";

class StorageHelper {
  private static readonly keys: Record<StorageKeys, string> = {
    account: "starticoins@USER_DATA",
    token: "starticoins@AUTH_TOKEN",
    sidebar_state: "starticoins@SIDEBAR_STATE",
  };

  /**
   * Stores a string value in either localStorage or sessionStorage under a specified key.
   *
   * @param key - The key under which the data will be stored. Must be a valid `StorageKeys` value.
   * @param data - The string data to store.
   * @param persistAfterSession - If `true`, stores the data in `localStorage` (persists after browser session).
   *                              If `false`, stores the data in `sessionStorage` (cleared after session ends).
   */
  static set(
    key: StorageKeys,
    data: string,
    persistAfterSession: boolean = true
  ): void {
    const storage = persistAfterSession ? localStorage : sessionStorage;
    storage?.setItem(StorageHelper.keys[key], data);
  }

  /**
   * Stores a JSON-serializable value in either localStorage or sessionStorage under the specified key.
   *
   * @template T - The type of the data to store.
   * @param key - The storage key to use, from the `StorageKeys` enum.
   * @param data - The data to serialize and store.
   * @param persistAfterSession - If `true`, stores the data in `localStorage` (persists after session);
   *                              if `false`, uses `sessionStorage` (cleared after session). Defaults to `true`.
   */
  static setJSON<T = unknown>(
    key: StorageKeys,
    data: T,
    persistAfterSession: boolean = true
  ): void {
    const strData = JSON.stringify(data);
    const storage = persistAfterSession ? localStorage : sessionStorage;
    storage?.setItem(StorageHelper.keys[key], strData);
  }

  /**
   * Sets a cookie in the browser with the specified key, value, and options.
   *
   * @param key - The key/name of the cookie to set.
   * @param value - The value to store in the cookie.
   * @param days - The number of days until the cookie expires. Defaults to 1 day.
   * @param secure - Whether to set the cookie as secure and with SameSite=Strict. Defaults to true.
   */
  static setCookie(
    key: StorageKeys,
    value: string,
    days: number = 1,
    secure: boolean = true
  ): void {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${key}=${value}; path=/; expires=${expires}; ${
      secure ? "secure; samesite=strict" : ""
    }`;
  }

  /**
   * Retrieves a value from either localStorage or sessionStorage based on the provided key.
   *
   * @template T - The expected return type of the stored value.
   * @param {StorageKeys} key - The key used to retrieve the value from storage.
   * @param {boolean} [persistAfterSession=true] - If true, retrieves from localStorage; otherwise, from sessionStorage.
   * @returns {(T | undefined)} The parsed value from storage if it exists, otherwise undefined.
   */
  static get<T = unknown>(
    key: StorageKeys,
    persistAfterSession: boolean = true
  ): undefined | T {
    const storage = persistAfterSession ? localStorage : sessionStorage;
    const data: string | null | T = storage?.getItem(StorageHelper.keys[key]);
    if (!data || data === null) {
      return undefined;
    }
    return data as T;
  }

  /**
   * Retrieves a JSON-parsed value from either localStorage or sessionStorage.
   *
   * @template T - The expected type of the parsed JSON object.
   * @param {StorageKeys} key - The key used to retrieve the value from storage.
   * @param {boolean} [persistAfterSession=true] - If true, uses localStorage; otherwise, uses sessionStorage.
   * @returns {(T | undefined)} The parsed value of type T if found, otherwise undefined.
   */
  static getJSON<T = unknown>(
    key: StorageKeys,
    persistAfterSession: boolean = true
  ): undefined | T {
    const storage = persistAfterSession ? localStorage : sessionStorage;
    let data: string | null | T = storage?.getItem(StorageHelper.keys[key]);
    if (!data || data === null) {
      return undefined;
    }
    data = JSON.parse(data) as T;
    return data;
  }

  /**
   * Retrieves the value of a cookie by its key from the browser's document cookies.
   *
   * @param key - The key of the cookie to retrieve.
   * @returns The decoded value of the cookie if found, otherwise `undefined`.
   */
  static getCookie(key: StorageKeys): string | undefined {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split("=");
      if (cookieKey === key) {
        return decodeURIComponent(cookieValue);
      }
    }
    return undefined;
  }

  /**
   * Retrieves the static set of storage keys defined in the `StorageHelper` class.
   *
   * @returns The object containing all predefined storage keys.
   */
  static getKeys(): typeof StorageHelper.keys {
    return StorageHelper.keys;
  }

  /**
   * Clears all data from both localStorage and sessionStorage.
   *
   * This method removes all key/value pairs from the browser's localStorage and sessionStorage,
   * effectively resetting any stored data for the current origin.
   *
   * @remarks
   * Use with caution, as this will remove all persisted data for the application.
   */
  static clear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}

export default StorageHelper;
