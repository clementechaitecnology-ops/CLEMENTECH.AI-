"use client";

import { useMemo, useSyncExternalStore } from "react";

type Store<T> = {
  getSnapshot: () => T;
  subscribe: (listener: () => void) => () => void;
  set: (value: T | ((current: T) => T)) => void;
};

const stores = new Map<string, Store<unknown>>();

function createStore<T>(key: string, initialValue: T): Store<T> {
  const cached = { raw: null as string | null, value: initialValue };
  const listeners = new Set<() => void>();

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function getSnapshot() {
    if (typeof window === "undefined") return initialValue;
    const raw = window.localStorage.getItem(key);
    if (raw === cached.raw) return cached.value;

    cached.raw = raw;
    if (raw === null) {
      cached.value = initialValue;
    } else {
      try {
        cached.value = JSON.parse(raw) as T;
      } catch {
        cached.value = initialValue;
      }
    }

    return cached.value;
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    function onStorage(event: StorageEvent) {
      if (event.key === key || event.key === null) {
        cached.raw = "\0";
        notify();
      }
    }

    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function set(value: T | ((current: T) => T)) {
    const next =
      typeof value === "function"
        ? (value as (current: T) => T)(getSnapshot())
        : value;
    const raw = JSON.stringify(next);
    window.localStorage.setItem(key, raw);
    cached.raw = raw;
    cached.value = next;
    notify();
  }

  return { getSnapshot, subscribe, set };
}

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, Store<T>["set"]] {
  const store = useMemo(() => {
    const existing = stores.get(key);
    if (existing) return existing as Store<T>;

    const created = createStore(key, initialValue);
    stores.set(key, created as Store<unknown>);
    return created;
  }, [initialValue, key]);

  const value = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => initialValue,
  );

  return [value, store.set];
}
