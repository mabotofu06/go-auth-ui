import { getAuthStore, getSessionAuth } from '$lib/stores/authStore';
import type { Handle } from '@sveltejs/kit';

const SKIP_PATH_LIST = [
	"/",
	"/ResetPassword"
]

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	console.log(event.cookies.getAll());

	if(SKIP_PATH_LIST.includes(event.url.pathname)){
		console.log("ミドルウェアskip対象ページのため処理をおこないません")
		return response;
	}

	if(!getSessionAuth(event)){
		console.log("認証情報がないためログインページに遷移します")
		return new Response(null,{
			status: 302,
			headers:{
				location: "/"
			}
		});
	}

	// リクエスト前の処理
	console.log('リクエストが受信されました:', event.url.pathname);

	// 認証チェックなどのミドルウェア処理をここに追加
	// const token = event.cookies.get('token');
	// if (!token && event.url.pathname !== '/') {
	// 	return Response.redirect('http://localhost', 302);
	// }

	// リクエストを処理
	// リクエスト後の処理
	console.log('レスポンスが生成されました:', response.status);

	return response;
};