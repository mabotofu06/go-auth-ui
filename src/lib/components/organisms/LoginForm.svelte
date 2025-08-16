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

<script lang="ts">
  import Button from '../atoms/Button.svelte';
  import InputWithValidation from '../molcules/InputWithValidation.svelte';
  import PasswordInput from '../molcules/PasswordInput.svelte';
  import { setErrorMessageStore } from '$lib/stores/errorRibbonStore';
  import {  clearAuthStore } from '$lib/stores/authStore';
  import { API_INFO } from '$lib/constants/api';
  import { logger } from '$lib/logger';

  export let className: string = '';
  
  let userId: string = '';
  let password: string = '';

  const handleLogin = async () => {
    logger.table({userId, password});
      if (!userId || !password) {
        setErrorMessageStore('top', 'Please enter both User ID and Password');
        return;
      }

      const response = await fetch(API_INFO.POST_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userId, password })
      });

    try {
      const resBody: ResponseDTO<ResLoginDTO> = await response.json();
      if(resBody.status !== 200) {
        setErrorMessageStore('top', resBody.message);
        clearAuthStore();
        return;
      }
      const queryObj = new URLSearchParams({
        code: resBody.data.code
      });
      if (resBody.data.state) {
        queryObj.set('state', resBody.data.state);
      }
      window.location.href = resBody.data.redirectUri + "?" + queryObj.toString();
    } catch (error) {
      // Handle network or server error
      logger.error("unexpected error:", error);
      setErrorMessageStore('top', "予期せぬエラーが発生しました");
      clearAuthStore();
    }
  };
  </script>

