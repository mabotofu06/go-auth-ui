import { writable, type Writable } from 'svelte/store';

export const errorMessageStore: Writable<string> = writable("");