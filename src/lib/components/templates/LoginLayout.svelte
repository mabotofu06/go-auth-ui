<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Card from '../molcules/Card.svelte';
  import LoginForm from '../organisms/LoginForm.svelte';
  import UserInfoFormModal from '../organisms/UserInfoFormModal.svelte';
  import { API_INFO } from '$lib/constants/api';

  let isModalOpen:boolean = false;

  //http://localhost/?response_type=code&client_id=MYS0000000&redirect_uri=http%3A%2F%2Flocalhost&scope=name&scope=email&state=hdsauhdbebejfs
  //http://localhost/?response_type=code&client_id=MYS0000001&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2FTop&scope=name&scope=email&state=hdsauhdbebejfs
  //http://localhost/?response_type=code&client_id=MYS0000002&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FTop&scope=name&scope=email&state=hdsauhdbebejfs
  onMount(async ()=>{
    const query: string = $page.url.search;
    console.log("url :", $page.url.pathname);
    console.log("params :", query);

    try{
      const res = await fetch(API_INFO.GET_PERMISSION + query, {method: 'GET'});
      if(res.status === 200){
        // セッションIDは読まない。必要ならサーバーがステータスやフラグだけ返す
        console.log("permission ok");
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
    <LoginForm className="mb-24"/>

    <p class="text-xl mb-5"
      on:click={openModal}
    >
    初めての方
    </p>
    <!-- <p class="text-xl mb-5"
      on:click={goPasswordResetPage}
    >パスワードを忘れた方</p> -->
  </Card>
</div>

<UserInfoFormModal isModalOpen={isModalOpen}/>