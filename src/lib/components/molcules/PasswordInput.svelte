<script lang="ts">
  export let className: string = "";
  export let placeholder: string = "";
  export let onChange: (value: string) => void = ()=>{};
  export let onBlur: (value: string) => boolean = ()=>true;
  export let value: string = "";

  let isValid = true;
  let passwordVisible = false;
</script>

<div class = {className}>
  <div class = "flex w-full border border-gray-300 rounded-2xl mb-1">
    <input
      class="flex-grow text-xl p-3 rounded-s-2xl"
      type={passwordVisible ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      on:change={(event)=>onChange(event.currentTarget.value)}
      on:focus={()=>{isValid = true;}}
      on:blur={(event)=>{isValid = onBlur(event.currentTarget.value)}}
    />
    <button
      on:mousedown={()=>passwordVisible=true}
      on:mouseup={()=>passwordVisible=false}
      type="button"
      class="w-16 bg-gray-500 text-white rounded-e-2xl"
    >
      {passwordVisible ? "Hide" : "Show"}
    </button>
  </div>
  {#if !isValid}
    <p class="px-3 text-red-500 text-sm h-5">{placeholder}を入力してください</p>
  {:else}
    <p class="h-5"></p>
  {/if}
</div>