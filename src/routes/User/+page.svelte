<div class="flex flex-col">
    <h1>ユーザー情報</h1>

    <div>
        <p>ユーザーID: {userId}</p>
        <p>名前: {userName}</p>
        <p>メールアドレス: {userEmail}</p>
    </div>
</div>

<script lang="ts">
    import { onMount } from "svelte";
    import { authStore, type AuthStore } from "$lib/stores/authStore";
    import { API_INFO } from "$lib/constants/api";
    import { logger } from "$lib/logger";

    const token: AuthStore = $authStore;

    let userId: string | null = null;
    let userName: string | null = null;
    let userEmail: string | null = null;

    onMount(async () => {
        // APIからユーザー情報を取得する処理
        const response = await fetch(`${API_INFO.GET_USER}?user_id=${token.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "session": token.session ?? ""
            }
        });
        const resBody = await response.json();

        if(resBody.status !== 200){
            logger.error("ユーザー情報の取得に失敗しました:", resBody);
        }

        userId = resBody.data.userId ?? null;
        userName = resBody.data.userName ?? null;
        userEmail = resBody.data.email ?? null;
    });
</script>
