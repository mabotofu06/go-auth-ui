<script lang="ts">
  import { onMount } from 'svelte';
  import Input from '../atoms/Input.svelte';
    import Button from '../atoms/Button.svelte';
  
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

<div class="flex flex-col items-center w-[700px] py-5">
  <h1 class="text-gray-500 text-3xl mb-10">Login</h1>

  <Input
    className="mb-2"
    type="text"
    placeholder="User ID / Email"
    onChange={(value) => userId = value}
  />
  <Input
    type="password"
    placeholder="password"
    onChange={(value) => password = value}
  />
  {#if errorMessage}
  <p class="text-red-500">{errorMessage}</p>
  {/if}

  <Button
    className="mt-5"
    label="Login"
    onClick={handleLogin}
  />
</div>