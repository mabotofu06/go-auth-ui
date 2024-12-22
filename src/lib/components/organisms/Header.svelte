<script lang="ts">
  import { authStore, clearAuthStore } from '$lib/stores/authStore';
    import ErrorRibbon from '../molcules/ErrorRibbon.svelte';
    import Modal from '../molcules/Modal.svelte';

  let isOpemLogoutModal = false;
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
</script>

<header class="flex justify-between items-center bg-gray-800 text-white text-3xl p-4">
  <button
    on:click={()=>{window.location.href="/"}}
  >
    Global - Auth
</button>
  {#if token}
  <button
    class="text-sm"
    on:click={openLogoutModal}
  >
    logout    
  </button>
  {/if}
</header>
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