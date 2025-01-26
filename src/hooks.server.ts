import { getAuthStore, getSessionAuth } from '$lib/stores/authStore';
import type { Handle } from '@sveltejs/kit';

const SKIP_PATH_LIST = [
	"/",
	"/ResetPassword/"
]
/*
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	const path = event.url.pathname;
	console.log(event.cookies.getAll());
	console.log(event.url.pathname);

	if(path.startsWith("/api/")){
		console.log("対向先への通信をおこないます")
		return response;
	}

	if(SKIP_PATH_LIST.includes(event.url.pathname)){
		console.log("ミドルウェアskip対象ページのため処理をおこないません")
		return response;
	}

	const session = getSessionAuth(event);

	if(!session?.session){
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
*/