<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '../molcules/Card.svelte';
  import LoginForm from '../organisms/LoginForm.svelte';
  import { loginStore } from '../../stores/loginStore';

  let currentUser:any;

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
</script>

<div class="flex flex-col items-center py-10">
  <Card className="flex flex-col items-center w-[700px] border rounded-3xl py-5 shadow-md">
    <LoginForm />
    {#if currentUser}
      <p>Welcome, {currentUser.username}!</p>
    {/if}
    <p>ユーザの新規登録は<a href="./">こちら</a></p>
    <p>パスワードを忘れた方は<a href="./">こちら</a></p>
  </Card>
</div>