<script lang="ts">
    import LoginLayout from "$lib/components/templates/LoginLayout.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { get } from "svelte/store";
    
    let queryParams: URLSearchParams;

    onMount(() => {
        queryParams = get(page).url.searchParams;
        console.log("redirect_uri :", queryParams.get('redirect_uri'));
        console.log("token :", queryParams.get('token'));
        console.log("url :", $page.url);
    });
</script>

<LoginLayout/>