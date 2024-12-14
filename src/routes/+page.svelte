<script lang="ts">
    import LoginLayout from "$lib/components/templates/LoginLayout.svelte";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    
    let queryParams;

        queryParams = get(page).url.searchParams;
        console.log("redirect_uri :", queryParams.get('redirect_uri'));
        console.log("token :", queryParams.get('token'));
        console.log("url :", $page.url);

        // go-auth認可ID要求フローを終えるように返されたヘッダ―情報をセッションストレージに保存
        //ログインリクエスト時にセットで送信し、
        // fetch(window.location.href).then(response => {
        //     const sessionId = response.headers.get('sesid');
        //     if (sessionId) {
        //         sessionStorage.setItem('session-id', sessionId);
        //         console.log("Session ID stored in sessionStorage:", sessionId);
        //     }
        // })
        // .catch(error => {
        //     console.error("Error fetching headers:", error);
        // });
</script>

<LoginLayout/>