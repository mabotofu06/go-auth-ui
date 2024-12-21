<script lang="ts">
  import { authStore, clearAuthStore } from '$lib/stores/authStore';
    import Button from '../atoms/Button.svelte';
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
  <slot/>
  <Modal
  modalTitle="ログアウト"
  isOpen={isOpemLogoutModal}
  onClose={closeLogoutModal}
>
  <h1 class="text-2xl my-5">ログアウトしますか？</h1>
  <Button
    className="text-sm"
    label="logout"
    onClick={logout}
  />
</Modal>