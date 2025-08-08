//import { isLoading, isLogin, postId } from '$lib/stores/state';
import { authStore, type AuthStore } from "$lib/stores/authStore";
import type { Reroute } from '@sveltejs/kit';

export const reroute: Reroute = async ({ url, fetch }) => {
	console.log('Rerouting to:', url.pathname);

	if (typeof window === 'undefined') return;
	//isLoading.set(true);

	const code = url.searchParams.get('code');
	const redirectUri = url.searchParams.get('redirect_uri');

	if (code && redirectUri) {
		const res = await fetch('/api/v1/access_token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code, redirect_uri: redirectUri })
		});
		const data = (await res.json()).data;
		// Handle access token response here
		console.log('Access token response:', data);
		authStore.set({userId: "test", session: data.access_token});
		// Optionally store token in localStorage/sessionStorage
		window.location.href = '/';
	}
};