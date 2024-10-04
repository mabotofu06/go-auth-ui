// // src/hooks.server.ts
// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
//     // リクエスト前の処理
//     console.log('リクエストが受信されました:', event.url.pathname);

//     // 認証チェックなどのミドルウェア処理をここに追加
//     const token = event.cookies.get('token');
//     if (!token && event.url.pathname !== '/') {
//         return Response.redirect('http://localhost', 302);
//     }

//     // リクエストを処理
//     const response = await resolve(event);

//     // リクエスト後の処理
//     console.log('レスポンスが生成されました:', response.status);

//     return response;
// };