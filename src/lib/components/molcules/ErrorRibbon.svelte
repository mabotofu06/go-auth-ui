<script lang="ts">
  export let message: string;
  export let hidden: boolean;
</script>

<div class={"error-ribbon bg-rose-500 py-3 text-2xl" + (hidden ? " hidden" : "")}>
  {message}
</div>

<style>
  .error-ribbon {
    width: 100%;
    color: white;
    text-align: center;
    padding: 10px;
    opacity: 1;
    transition: opacity 3s ease-out;
    animation: fadeIn 0.5s ease-out;
  }
  .error-ribbon.hidden {
    opacity: 0;
    transition: opacity 3s ease-out;
    /* animation: fadeOut 3s ease-out; */
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>