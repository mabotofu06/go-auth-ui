import type { RequestEvent } from '@sveltejs/kit';
import { writable, type Writable } from 'svelte/store';
const AUTH_STORE_KEY = "go-auth-store";

export interface AuthStore {
  userId: string;
  session: string;
}

const createAuthStore = (initValue: AuthStore): Writable<AuthStore> => {
  const initialValue
    = typeof window !== 'undefined'
      ? (JSON.parse(sessionStorage.getItem(AUTH_STORE_KEY)??"") || initValue)
      : { userId: "", session: "" };

  const { subscribe, set, update } = writable(initialValue);

  return {
    subscribe,
    set: (value: AuthStore) => {
      if(typeof window !== 'undefined'){
        sessionStorage.setItem(AUTH_STORE_KEY, JSON.stringify(value));
        set(value);
      }
      if(typeof document !== 'undefined'){
        document.cookie = `${AUTH_STORE_KEY}=${JSON.stringify(value)}`;
      }
    },
    update: () => {
      // const value = fn(get(store));
      // sessionStorage.setItem(AUTH_STORE_KEY, JSON.stringify(value));
      // update(fn);
    }
  };
}

export const authStore = createAuthStore({ userId: "", session: "" });

export const getAuthStore = (): AuthStore => {
  const noData = { userId: "", session: "" };
  return typeof window !== 'undefined'
    ? (JSON.parse(sessionStorage.getItem(AUTH_STORE_KEY) ?? JSON.stringify(noData)))
    : noData;
}

export const getSessionAuth = (event: RequestEvent): AuthStore | null => {
  const session = event.cookies.get(AUTH_STORE_KEY)
  if (!session) return null;
  console.log(session);
  return JSON.parse(session);
}

export const clearAuthStore = ()=>{
  authStore.set({ userId: "", session: "" });
  if(typeof document !== "undefined"){
    document.cookie=`${AUTH_STORE_KEY}=;`;
  }
}