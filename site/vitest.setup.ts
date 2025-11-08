import "@testing-library/jest-dom";

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  });
}

if (typeof window !== "undefined") {
  const memoryStore = new Map<string, string>();
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (key: string) => (memoryStore.has(key) ? memoryStore.get(key)! : null),
      setItem: (key: string, value: string) => {
        memoryStore.set(key, value);
      },
      removeItem: (key: string) => {
        memoryStore.delete(key);
      },
      clear: () => {
        memoryStore.clear();
      },
      key: (index: number) => Array.from(memoryStore.keys())[index] ?? null,
      get length() {
        return memoryStore.size;
      }
    } satisfies Storage,
    configurable: true
  });
}
