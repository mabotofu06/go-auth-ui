<script lang="ts">
  import Card from '../molcules/Card.svelte';
  import LoginForm from '../organisms/LoginForm.svelte';
  import Modal from '../molcules/Modal.svelte';
  import UserInfoForm from '../organisms/UserInfoForm.svelte';

  let isModalOpen:boolean = false;
  
  const openModal = () => {
    isModalOpen = true;
  };
  const closeModal = () => {
    isModalOpen = false;
  };
  const goPasswordResetPage = ()=>{
    window.location.href = "./ResetPassword"
  }
</script>

<div class="flex flex-col items-center py-10">
  <Card className="flex flex-col items-center w-[700px] border rounded-3xl py-5 shadow-md">
    <LoginForm className="mb-24" />

    <p class="text-xl mb-5"
      on:click={openModal}
    >初めての方</p>
    <p class="text-xl mb-5"
      on:click={goPasswordResetPage}
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