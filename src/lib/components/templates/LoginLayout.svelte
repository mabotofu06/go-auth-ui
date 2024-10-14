<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '../molcules/Card.svelte';
  import LoginForm from '../organisms/LoginForm.svelte';
  import { loginStore } from '$lib/stores/loginStore';
    import Modal from '../molcules/Modal.svelte';
    import UserInfoForm from '../organisms/UserInfoForm.svelte';

  let currentUser:any;
  let isModalOpen:boolean = false;
  
  onMount(() => {
    // ストアの値を購読
    const unsubscribe = loginStore.subscribe(value => {
      currentUser = value;
    });

    // コンポーネントが破棄されるときに購読を解除
    return () => {
      unsubscribe();
    };
  });

  const openModal = () => {
    isModalOpen = true;
  };

  const closeModal = () => {
    isModalOpen = false;
  };
</script>

<div class="flex flex-col items-center py-10">
  <Card className="flex flex-col items-center w-[700px] border rounded-3xl py-5 shadow-md">
    <LoginForm className="mb-24" />

    <p class="text-xl mb-5"
      on:click={openModal}
    >初めての方</p>
    <p class="text-xl mb-5"
      on:click={openModal}
    >パスワードを忘れた方</p>
  </Card>
</div>

<Modal
  modalTitle="ユーザ新規登録"
  isOpen={isModalOpen}
  onClose={closeModal}
>
  <UserInfoForm/>
</Modal>