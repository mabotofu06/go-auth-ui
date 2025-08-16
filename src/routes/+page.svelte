<!-- ストアのセッション確認して存在しなければログイン画面を表示 -->
{#if !token.session}
  <LoginLayout/>
{:else}
  <PotalLayout/>
{/if}

<script lang="ts">
  import LoginLayout from "$lib/components/templates/LoginLayout.svelte";
  import PotalLayout from "$lib/components/templates/PotalLayout.svelte";
  import { authStore, type AuthStore } from "$lib/stores/authStore";

  const token: AuthStore = $authStore;
</script>

