<script lang="ts">
  export let isOpen: boolean;
  export let onClose: () => void;

  const handleClose = () => {
    onClose();
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-3 rounded-lg shadow-lg">
      <div class="modal-title">
        modal title
      </div>
      <hr/>
        <slot></slot>
      <hr/>
      <div class="modal-footer">
        <button on:click={handleClose} class="bg-red-500 p-2 text-white rounded-xl">閉じる</button>
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
</style>