<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import InputWithValidation from '../molcules/InputWithValidation.svelte';
  import PasswordInput from '../molcules/PasswordInput.svelte';
  import { setErrorMessageStore } from '$lib/stores/errorRibbonStore';
  import { authStore, clearAuthStore } from '$lib/stores/authStore';
  import { page } from '$app/stores';

  export let className: string = '';
  export let sessionId: string = '';
  
  let userId: string = '';
  let password: string = '';

  const handleLogin = async () => {
    console.table({userId, password});
      if (!userId || !password) {
        setErrorMessageStore('top', 'Please enter both User ID and Password');
        return;
      }

      if(false) {
        authStore.set({ userId, session: 'dummy' });
        window.location.href = "/";
        return;
      }

      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Session-Id': sessionId
        },
        //TODO: passwordをエンコード（環境変数の値から）
        body: JSON.stringify({ userId, password })
      });
  
    try {
      const res: ResponseDTO<ResLoginDTO> = await response.json();
      if(res.status === 200) {
        console.log("Login successful");
        authStore.set({
          userId: res.data.userId,
          session: res.data.session
        });
        window.location.href = "/";
      }
      else {
        //TODO: バックエンドからのステータスに合わせてエラーメッセージを表示する
        setErrorMessageStore('top', res.message);
        clearAuthStore();
      }
    } catch (error) {
      // Handle network or server error
      console.log("unexpected error:", error);
      setErrorMessageStore('top', "予期せぬエラーが発生しました");
      clearAuthStore();
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