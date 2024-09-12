<script lang="ts">
  export let className: string = "";
  export let type: "text" | "password" | "email" = "text";
  export let placeholder: string = "";
  export let onChange: (value: string) => void = ()=>{};
  export let value: string = "";
</script>

<div class = {className}>
  <input
    class="w-96 text-xl p-3 border border-gray-300 rounded-2xl"
    type={type}
    placeholder={placeholder}
    value={value}
    on:change={(event)=>onChange(event.currentTarget.value)}
  />
</div>