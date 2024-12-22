import { writable, type Writable } from 'svelte/store';

export interface ErrorMessageStore{
  top: string;
  modal: string;
}

export type ErrorMessageStoreKey = 'top' | 'modal';

export const errorMessageStore: Writable<ErrorMessageStore> = writable({top: '', modal: ''});
export const setErrorMessageStore = (key: ErrorMessageStoreKey, message: string) => {
  errorMessageStore.update((store) => {
    store[key] = message;
    return store;
  });
}