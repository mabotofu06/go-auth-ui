<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import InputWithValidation from '../molcules/InputWithValidation.svelte';
  import PasswordInput from '../molcules/PasswordInput.svelte';
  import { setErrorMessageStore } from '$lib/stores/errorRibbonStore';
  import { authStore, clearAuthStore } from '$lib/stores/authStore';

  export let className: string = '';
  
  let userId: string = '';
  let password: string = '';
  
  const handleLogin = async () => {
    console.table({userId, password});
    try {
      if (!userId || !password) {
        setErrorMessageStore('top', 'Please enter both User ID and Password');
        return;
      }

      authStore.set({ userId, session: 'dummy' });
      window.location.href = "/";
      return;

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, password })
      });
  
      if (response.ok) {
        console.log("Login successful");
        // Login successful, redirect or perform any necessary actions
      } else {
        //TODO: バックエンドからのステータスに合わせてエラーメッセージを表示する
        setErrorMessageStore('top', "ログインに失敗しました");
        console.log("Login failed");
        clearAuthStore();
      }
    } catch (error) {
      // Handle network or server error
      console.log("unexpected error:", error);
    }
  };

  onMount(() => {
    // Add any necessary initialization code here
  });
  </script>

<div class={className}>
  <div class="flex flex-col items-center w-[700px] py-5">
    <h1 class="text-gray-500 text-3xl mb-10">Login</h1>

    <InputWithValidation
      className="w-96 mb-2"
      type="text"
      placeholder="User ID / Email"
      onChange={(value) => userId = value}
      onBlur={(value) => {return value.length > 0}}
    />
    <PasswordInput
      className="w-96"
      placeholder="password"
      onChange={(value) => password = value}
      onBlur={(value) => {return value.length > 0}}
    />

    <Button
      className="mt-5"
      label="Login"
      onClick={handleLogin}
    />
  </div>
</div>