<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Card from '../molcules/Card.svelte';
  import LoginForm from '../organisms/LoginForm.svelte';
  import UserInfoFormModal from '../organisms/UserInfoFormModal.svelte';

  let isModalOpen:boolean = false;
  let sessionId: string = '';

  //http://localhost/?response_type=code&client_id=go0001&redirect_uri=http%3A%2F%2Flocalhst%3A3000%2FTop&scope=name&scope=email&state=hdsauhdbebejfs
  onMount(async ()=>{
    const query: string = $page.url.search;
    console.log("url :", $page.url.pathname);
    console.log("params :", query);

    try{
      const res = await fetch('/api/v1/auth_permission' + query, {method: 'GET'});
      if(res.status === 200){
        sessionId = res.headers.get('sesid') ?? "";
        console.log("session_id:", sessionId);
      }
  
    }catch(error){
      console.error("Error fetching headers:", error);
    }
  })

  
  const openModal = () => {
    isModalOpen = true;
  };
  const goPasswordResetPage = ()=>{
    window.location.href = "./ResetPassword"
  }
</script>

<div class="flex flex-col items-center py-10">
  <Card className="flex flex-col items-center w-[700px] border rounded-3xl py-5 shadow-md">
    <LoginForm className="mb-24" sessionId={sessionId}/>

    <p class="text-xl mb-5"
      on:click={openModal}
    >
    初めての方
    </p>
    <p class="text-xl mb-5"
      on:click={goPasswordResetPage}
    >パスワードを忘れた方</p>
  </Card>
</div>

<UserInfoFormModal isModalOpen={isModalOpen}/>