<script lang="ts">
import { onMount } from 'svelte';
import Card from '../molcules/Card.svelte';
    import LoginForm from '../organisms/LoginForm.svelte';

onMount(() => {
  // Add any necessary initialization code here
});
</script>

<div class="flex flex-col items-center py-10">
  <Card className = "flex flex-col items-center w-[700px] border rounded-3xl py-5 shadow-md">
    <LoginForm />

    <p>ユーザの新規登録は<a href="./">こちら</a></p>
    <p>パスワードを忘れた方は<a href="./">こちら</a></p>
</Card>
</div>
