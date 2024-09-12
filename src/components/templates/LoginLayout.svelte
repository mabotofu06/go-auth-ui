<script lang="ts">
import { onMount } from 'svelte';

let userId = '';
let password = '';
let errorMessage = '';

const handleLogin = async () => {
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

<div class="flex flex-col items-center mt-10">
  <div class="flex flex-col items-center w-[700px] border rounded-3xl py-5 shadow-md">

    <h1 class="text-gray-500 text-3xl mb-10">Login</h1>

    <input
      class="w-96 text-xl p-3 m-2 border border-gray-300 rounded-2xl"
      type="text"
      placeholder="User ID / Email"
      bind:value={userId}
    />
    <input
      class="w-96 text-xl p-3 m-2 border border-gray-300 rounded-2xl"
      type="password"
      placeholder="Password"
      bind:value={password}
    />
    {#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
    {/if}

    <button
      class="text-2xl px-5 py-2 my-8 bg-gray-500 text-white rounded-2xl"
      on:click={handleLogin}
    >Login</button>

    <p>ユーザの新規登録はこちら</p>
    <p>パスワードを忘れた方はこちら</p>
  </div>
</div>
