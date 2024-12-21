import type { RequestEvent } from '@sveltejs/kit';
import { writable } from 'svelte/store';
const AUTH_STORE_KEY = "go-auth-store";

const createAuthStore = (initValue: string) => {
  const initialValue
    = typeof window !== 'undefined'
      ? (sessionStorage.getItem(AUTH_STORE_KEY) || initValue)
      : "";

  const { subscribe, set, update } = writable(initialValue);

  return {
    subscribe,
    set: (value: string) => {
      if(typeof window !== 'undefined'){
        sessionStorage.setItem(AUTH_STORE_KEY, value);
        set(value);
      }
      if(typeof document !== 'undefined'){
        document.cookie = `${AUTH_STORE_KEY}=${value}`;
      }
    },
    update: () => {
      // const value = fn(get(store));
      // sessionStorage.setItem(AUTH_STORE_KEY, JSON.stringify(value));
      // update(fn);
    }
  };
}

export const authStore = createAuthStore("");

export const getAuthStore = (): string=>{
  return typeof window !== 'undefined'
    ? (sessionStorage.getItem(AUTH_STORE_KEY) ?? "")
    : ""
}

export const getSessionAuth = (event: RequestEvent): string | null => {
  const session = event.cookies.get(AUTH_STORE_KEY)
  if (!session) return null;
  console.log(session);
  return session;
}

export const clearAuthStore = ()=>{
  authStore.set("");
  if(typeof document !== "undefined"){
    document.cookie=`${AUTH_STORE_KEY}=;`;
  }
}