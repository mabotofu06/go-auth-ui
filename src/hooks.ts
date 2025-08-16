//import { isLoading, isLogin, postId } from '$lib/stores/state';
import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URL } from "$env/static/public";
import { API_INFO, type ApiResponse } from "$lib/constants/api";
import { logger } from "$lib/logger";
import { authStore, getAuthStore } from "$lib/stores/authStore";
import { setErrorMessageStore } from "$lib/stores/errorRibbonStore";
import type { Reroute } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export const reroute: Reroute = async ({ url, fetch }) => {
	logger.info('Rerouting to:', url.pathname);

	//本処理はサーバ、クライアント両サイドで実行されるため、windowオブジェクトが存在しない場合（サーバサイドでない）は何もしない
	if (typeof window === 'undefined') return;

	//TODO:認可コード取得エラーハンドリングができるようにする
	// if (url.searchParams.get('error')) {
	// 	logger.error('認可コードが取得できませんでした');
	// 	window.location.href = "/";
	// 	return;
	// }

	if (getAuthStore().session && getAuthStore().userId) return;

	//認可コードチェック
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	if (code) {
		const sessionState = sessionStorage.getItem('state');
    sessionStorage.removeItem('state');
		if ((state || sessionState)){
			logger.debug("stateが存在するため検証をおこないます:", state, sessionState);
			if(state !== sessionState) {
				setErrorMessageStore('top', '認証エラーが発生しました');
				window.location.href = "/";
				return;
			}
		}

		const res = await fetch(API_INFO.GET_ACCESS_TOKEN, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code, redirect_uri: PUBLIC_REDIRECT_URL })
		});
		const resBody: ApiResponse<any> = await res.json();
		if (resBody.status !== 200) {
			logger.error('アクセストークンの取得に失敗しました.再認証をおこないます', resBody);
			//TODO:再認証はリトライ制限を設ける
			window.location.href = "/";
			return;
		}

		// Handle access token response here
		logger.debug('アクセストークンが返却されました:', resBody.data);
		authStore.set({userId: resBody.data.user_id, session: resBody.data.access_token});
		// URL から code/state を除去 (履歴汚染防止)
		const cleanUrl = url.origin + url.pathname;
		history.replaceState(null, '', cleanUrl);
		return;
	}

	logger.info('セッション情報がないため、認証を開始します');
	const queryObj = {
		response_type: "code",
		client_id    : PUBLIC_CLIENT_ID,
		redirect_uri : PUBLIC_REDIRECT_URL,
		state        : uuidv4()
	}
	sessionStorage.setItem('state', queryObj.state);
	logger.debug('認可コード要求APIにリクエストを送信します:', API_INFO.GET_PERMISSION, JSON.stringify(queryObj));
	const res = await fetch(
		API_INFO.GET_PERMISSION + "?" + new URLSearchParams(queryObj).toString(),
		{method: 'GET', credentials: 'include'}
	);
	const resBody: ApiResponse<any> = await res.json();
	if(resBody.status !== 200){
		setErrorMessageStore('top', resBody.message);
	}
	logger.debug('認可コード要求APIの正常レスポンス:', JSON.stringify(resBody));
};