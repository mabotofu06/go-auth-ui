<script lang="ts">
  //export let authToken;
  import Header from '$lib/components/organisms/Header.svelte';
  import ErrorRibbon from '$lib/components/molcules/ErrorRibbon.svelte';
  import { errorMessageStore } from '$lib/stores/errorRibbonStore';
  import "../global.css"

  let errorMessage;
  $: errorMessage = $errorMessageStore;
</script>

<Header>
  <ErrorRibbon
    message="{errorMessage}"
    hidden={errorMessage === ""}
  />
  <main class="bg-white min-h-[900px]">
    <slot />
  </main>
  <footer class="text-gray-800 p-4 h-fit">
    Copyright 2024
  </footer>
</Header>