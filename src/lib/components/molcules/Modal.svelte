<script lang="ts">
  import Button from "../atoms/Button.svelte";
  import ErrorRibbon from "./ErrorRibbon.svelte";

  export let modalTitle: string;
  export let isOpen: boolean;
  export let rejectBtnLabel = "Close";
  export let acceptBtnLabel = "OK";
  export let onReject: () => void = () => {};
  export let onAccept: () => void = () => {};
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white rounded-lg shadow-lg min-w-96">
      <div class="modal-title flex bg-gray-800 rounded-t-lg text-white items-center p-3 text-2xl">
        {modalTitle}
      </div>
        <ErrorRibbon msgTargetKey = 'modal'/>
        <slot/>
      <hr/>
      <div class="modal-footer p-3 flex justify-between">
        <Button onClick={onReject} color="error" label={rejectBtnLabel}/>
        <Button onClick={onAccept} label={acceptBtnLabel}/>
      </div>
    </div>
  </div>
{/if}

<style>
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .modal-title {
  }
</style>