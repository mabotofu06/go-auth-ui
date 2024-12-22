<script lang="ts">
  import { errorMessageStore, type ErrorMessageStoreKey } from "$lib/stores/errorRibbonStore";
  
  export let msgTargetKey: ErrorMessageStoreKey = "top";
  $: errMsgObj = $errorMessageStore;

  // showErrorMessage に値が設定されたときに一定時間後に非表示にする
  $: if (errMsgObj[msgTargetKey] && errMsgObj[msgTargetKey] !== "") {
    setTimeout(() => {
      errMsgObj[msgTargetKey] = "";
      errorMessageStore.set(errMsgObj);
    }, 3000); // 3秒後にフェードアウト
  }
</script>

{#if errMsgObj[msgTargetKey] && errMsgObj[msgTargetKey] !== ""}
  <div class={"error-ribbon bg-rose-500 py-3 text-2xl"}>
    {errMsgObj[msgTargetKey]}
  </div>
{/if}

<style>
  .error-ribbon {
    width: 100%;
    color: white;
    text-align: center;
    padding: 10px;
    opacity: 1;
    transition: opacity 3s ease-out;
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>