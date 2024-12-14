<script lang="ts">
	import ErrorRibbon from '$lib/components/molcules/ErrorRibbon.svelte';
  import { errorMessageStore } from '$lib/stores/errorRibbonStore';
  import '../global.css';

  let errorMessage: string;

  $:errorMessage = $errorMessageStore;
</script>

<header class="bg-gray-800 text-white text-3xl p-4">
  <a href="./">Global - Auth</a>
</header>
<ErrorRibbon message="{errorMessage}" hidden={errorMessage === ""} />

<main class="bg-white min-h-[900px]">
  <slot />
</main>

<footer class=" text-gray-800 p-4 h-fit">
  Copyright 2024
</footer>