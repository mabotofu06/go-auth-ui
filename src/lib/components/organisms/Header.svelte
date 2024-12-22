<script lang="ts">
  import { authStore, clearAuthStore } from '$lib/stores/authStore';
    import ErrorRibbon from '../molcules/ErrorRibbon.svelte';
    import Modal from '../molcules/Modal.svelte';

  let isOpemLogoutModal = false;
  let isOpenUserMenu = false;
  const token = $authStore

  const openLogoutModal = ()=>{
    isOpemLogoutModal = true;
  }
  const closeLogoutModal = ()=>{
    isOpemLogoutModal = false;
  }
  const logout = ()=>{
    closeLogoutModal();
    clearAuthStore();
    window.location.href="/"
  }
  const openUserMenu = ()=>{
    isOpenUserMenu = true;
  }
  const navigateTo = (path: string) => {
    window.location.href = path;
  }
</script>

<header class="flex justify-between items-center bg-gray-800 text-white text-3xl p-4">
  <button
    on:click={()=>{window.location.href="/"}}
  >
    Global - Auth
</button>
  {#if token.session}
  <button
    class="text-sm hover:opacity-50"
    on:click={openUserMenu}
  >
    ようこそ {token.userId} さん
  </button>
  {/if}
</header>
{#if isOpenUserMenu}
<div class="userMenu absolute right-0 flex flex-col  text-gray-600 fix min-w-28 text-xl border border-gray-400">
  <button
    class="py-2 hover:opacity-50"
    on:click={()=>{isOpenUserMenu=false; navigateTo("/User")}}
  >info</button>
  <button
    class="py-2 hover:opacity-50"
    on:click={()=>{isOpenUserMenu=false; openLogoutModal()}}
  >logout</button>

</div>  
{/if}

  <ErrorRibbon />

    <slot/>

  <Modal
    modalTitle="ログアウト確認"
    isOpen={isOpemLogoutModal}
    onReject={closeLogoutModal}
    onAccept={logout}
  >
  <h1 class="text-2xl m-5">ログアウトしますか？</h1>
</Modal>