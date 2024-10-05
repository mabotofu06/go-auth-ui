<script lang="ts">
  export let className: string = "";
  export let label: string = "";
  export let onClick: () => void = () => {};
</script>

<div class = {className}>
  <button
    class="text-2xl px-5 py-2 bg-gray-500 text-white rounded-2xl hover:opacity-50"
    on:click={onClick}
  >
    {label}
  </button>
</div>