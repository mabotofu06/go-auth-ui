<script lang="ts">
  import Header from '$lib/components/organisms/Header.svelte';
  import "../global.css"
</script>

<Header>
  <main class="bg-white min-h-[900px]">
    <slot />
  </main>
  <footer class="text-gray-800 p-4 h-fit">
    Copyright 2024
  </footer>
</Header>