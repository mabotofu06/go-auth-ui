import { writable } from 'svelte/store';

const LOGIN_STORE_KEY = "go-auth-ui-login-store";

// セッションストレージから初期値を取得
const InitLoginStore = (value: any): any => {
  if (typeof window !== 'undefined') {
    const storedValue = sessionStorage.getItem(LOGIN_STORE_KEY);
    return storedValue ? JSON.parse(storedValue) : value;
  }
  return value;
}

// パーシスタントストアを作成
export const setLoginStore = (value: any) => {
  const store = writable(InitLoginStore(value));

  if (typeof window !== 'undefined') {
    store.subscribe(value => {
      sessionStorage.setItem(LOGIN_STORE_KEY, JSON.stringify(value));
    });
  }

  return store;
}

export const loginStore = setLoginStore(null);