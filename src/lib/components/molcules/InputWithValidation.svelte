<script lang="ts">
  export let className: string = "";
  export let type: "text" | "password" | "email" = "text";
  export let placeholder: string = "";
  export let onChange: (value: string) => void = ()=>{};
  export let onBlur: (value: string) => boolean = ()=>true;
  export let value: string = "";

  let isValid = true;
</script>

<div class = {className}>
  <input
    class="w-96 text-xl p-3 border border-gray-300 rounded-2xl mb-1"
    type={type}
    placeholder={placeholder}
    value={value}
    on:change={(event)=>onChange(event.currentTarget.value)}
    on:focus={()=>{isValid = true;}}
    on:blur={(event)=>{isValid = onBlur(event.currentTarget.value)}}
  />
  {#if !isValid}
    <p class="px-3 text-red-500 text-sm h-5">{placeholder}を入力してください</p>
  {:else}
    <p class="h-5"></p>
  {/if}
</div>