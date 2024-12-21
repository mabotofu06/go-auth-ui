<script lang="ts">
    import LoginLayout from "$lib/components/templates/LoginLayout.svelte";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    import PotalLayout from "$lib/components/templates/PotalLayout.svelte";
    import { onMount } from "svelte";
    import { authStore } from "$lib/stores/authStore";
    

    const queryParams = get(page).url.searchParams;
    const token = queryParams.get('token') || $authStore

    onMount(()=>{
        console.log("redirect_uri :", queryParams.get('redirect_uri'));
        console.log("token :", queryParams.get('token'));
        console.log("url :", $page.url);
    })


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

<!-- ストアのセッション確認して存在しなければログイン画面を表示 -->
{#if !token}
    <LoginLayout/>
{:else}
    <PotalLayout/>
{/if}