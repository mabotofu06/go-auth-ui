<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import { loginStore } from '../../stores/loginStore';
  import InputWithValidation from '../molcules/InputWithValidation.svelte';
  import PasswordInput from '../molcules/PasswordInput.svelte';
  import { errorMessageStore } from '$lib/stores/errorRibbonStore';

  export let className = '';
  
  let userId = '';
  let password = '';
  let passwordConfirm = '';

  let errorMessage = '';
  
  $: errorMessage = $errorMessageStore;

  $: if (errorMessage !== "") {
    setTimeout(() => {
      errorMessageStore.set("");
    }, 3000);
  }
  
  const handleSubmit = async () => {
    console.table({userId, password, passwordConfirm});
    try {
      if (!userId || !password || !passwordConfirm) {
        errorMessageStore.set('Please fill in all fields');
        return;
      }

      loginStore.set({ username: userId });
  
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, password, passwordConfirm})
      });
  
      if (response.ok) {
        console.log("User information submitted successfully");
      } else {
        errorMessageStore.set("Failed to submit user information");
        console.log("Submission failed");
      }
    } catch (error) {
      console.log("unexpected error:", error);
    }
  };

  onMount(() => {
    // Add any necessary initialization code here
  });
</script>

<div class={className}>
  <div class="flex flex-col items-center w-[700px] py-5">
    <h1 class="text-gray-500 text-3xl mb-10">アカウント新規作成</h1>

    <InputWithValidation
      className="w-96 mb-2"
      type="text"
      placeholder="User ID"
      onChange={(value) => userId = value}
      onBlur={(value) => {return value.length > 0}}
    />
    <PasswordInput
      className="w-96"
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

    <Button
      className="mt-5"
      label="Submit"
      onClick={handleSubmit}
    />
  </div>
</div>