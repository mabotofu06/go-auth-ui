<script lang="ts">
  export let className = '';

  import { onMount } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import { loginStore } from '../../stores/loginStore';
  import InputWithValidation from '../molcules/InputWithValidation.svelte';
  import PasswordInput from '../molcules/PasswordInput.svelte';
  
  let userId = '';
  let password = '';
  let errorMessage = '';
  
  const handleLogin = async () => {
    console.table({userId, password});
    // Perform login request here
    try {
      if (!userId || !password) {
        errorMessage = 'Please enter both User ID and Password';
        return;
      }

      loginStore.set({ username: userId });
  
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, password })
      });
  
      if (response.ok) {
        // Login successful, redirect or perform any necessary actions
      } else {
        // Login failed, handle error
      }
    } catch (error) {
      // Handle network or server error
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