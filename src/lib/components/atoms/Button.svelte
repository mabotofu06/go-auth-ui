<script lang="ts">
  export let className: string = "";
  export let label: string = "";
  export let onClick: () => void = () => {};
  export let color: "primary" | "error" = "primary";

  let btnColor = "bg-gray-500";

  $: switch(color){
    case "primary":
    btnColor = "bg-gray-500";
      break;
    case "error":
    btnColor = "bg-red-500";
      break;
  }
</script>

<div class = {className}>
  <button
    class={`text-2xl px-5 py-2 ${btnColor} text-white rounded-2xl hover:opacity-50`}
    on:click={onClick}
  >
    {label}
  </button>
</div>