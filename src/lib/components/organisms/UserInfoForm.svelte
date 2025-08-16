<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import InputWithValidation from '../molcules/InputWithValidation.svelte';
  import PasswordInput from '../molcules/PasswordInput.svelte';
  import { setErrorMessageStore } from '$lib/stores/errorRibbonStore';
    import { logger } from '$lib/logger';

  export let className = '';
  
  let userId = '';
  let password = '';
  let passwordConfirm = '';
    
  const handleSubmit = async () => {
    logger.table({userId, password, passwordConfirm});
    try {
      if (!userId || !password || !passwordConfirm) {
        setErrorMessageStore('modal', 'Please fill in all fields');
        return;
      }

      // setAuthStore("token")

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, password, passwordConfirm})
      });
  
      if (response.ok) {
        logger.info("User information submitted successfully");
      } else {
        setErrorMessageStore('modal', "Failed to submit user information");
        logger.error("Submission failed");
      }
    } catch (error) {
      logger.error("unexpected error:", error);
    }
  };

  onMount(() => {
    // Add any necessary initialization code here
  });
</script>

<div class={className}>
  <div class="flex flex-col items-center w-[700px] py-8">
    <InputWithValidation
      className="w-96 mb-2"
      type="text"
      placeholder="User ID"
      onChange={(value) => userId = value}
      onBlur={(value) => {return value.length > 0}}
    />
    <PasswordInput
      className="w-96 mb-1"
      placeholder="Password"
      onChange={(value) => password = value}
      onBlur={(value) => {return value.length > 0}}
    />
    <PasswordInput
      className="w-96"
      placeholder="Password(確認用)"
      onChange={(value) => passwordConfirm = value}
      onBlur={(value) => {return value.length > 0}}
    />

    <Button
      className="mt-5"
      label="Submit"
      onClick={handleSubmit}
    />
  </div>
</div>