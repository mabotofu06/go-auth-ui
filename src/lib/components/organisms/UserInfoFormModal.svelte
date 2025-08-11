<script lang="ts">
  import { onMount } from 'svelte';
  import InputWithValidation from '../molcules/InputWithValidation.svelte';
  import PasswordInput from '../molcules/PasswordInput.svelte';
  import { setErrorMessageStore } from '$lib/stores/errorRibbonStore';
  import Modal from '../molcules/Modal.svelte';
    import { API_INFO } from '$lib/constants/api';
  
  export let isModalOpen = false;

  let userId = '';
  let userName = '';
  let password = '';
  let passwordConfirm = '';
    
  const handleSubmit = async () => {
    console.table({userId, userName, password, passwordConfirm});
    try {
      //バリデーションチェック
      if (!userId || !password || !passwordConfirm) {
        setErrorMessageStore('modal', 'Please fill in all fields');
        return;
      }

      // setAuthStore("token")

      const response = await fetch(API_INFO.POST_USER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, userName, password, passwordConfirm})
      });

      const resBody = await response.json();

      if (resBody.status === 200) {
        console.log("User information submitted successfully");
        closeModal();
        return;
      }

      setErrorMessageStore('modal', resBody.message);
      console.error("Submission failed");

    } catch (error) {
      console.error("unexpected error:", error);
    }
  };

  const closeModal = () => {
    isModalOpen = false;
  };

  onMount(() => {
    // Add any necessary initialization code here
  });
</script>

<Modal
  modalTitle="ユーザ新規登録"
  isOpen={isModalOpen}
  onReject={closeModal}
  acceptBtnLabel="Submit"
  onAccept={handleSubmit}
>
  <div class="flex flex-col items-center w-[700px] py-8">
    <InputWithValidation
      className="w-96 mb-2"
      type="text"
      placeholder="User ID"
      onChange={(value) => userId = value}
      onBlur={(value) => {return value.length > 0}}
    />
    <InputWithValidation
      className="w-96 mb-2"
      type="text"
      placeholder="User Name"
      onChange={(value) => userName = value}
      onBlur={(value) => {return value.length > 0}}
    />
    <PasswordInput
      className="w-96 mb-1"
      placeholder="Password"
      onChange={(value) => password = value}
      onBlur={(value) => {return value.length > 0}}
    />
    <PasswordInput
      className="w-96"
      placeholder="Password(確認用)"
      onChange={(value) => passwordConfirm = value}
      onBlur={(value) => {return value.length > 0}}
    />
  </div>
</Modal>