<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import LoginLayout from "../components/templates/LoginLayout.svelte";

    let queryParams;

    onMount(() => {
        queryParams = $page.url.searchParams;
        console.log("redirect_uri :", queryParams.get('redirect_uri'));
        console.log("token :", queryParams.get('token'));
        console.log("url :", $page.url);
    });
</script>

<LoginLayout/>