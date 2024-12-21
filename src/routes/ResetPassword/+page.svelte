<script lang="ts">
    import Button from "$lib/components/atoms/Button.svelte";
    import Card from "$lib/components/molcules/Card.svelte";
    import InputWithValidation from "$lib/components/molcules/InputWithValidation.svelte";

    let isSend: boolean = false;

</script>

<div class="flex justify-center">
    <Card className="flex flex-col items-center w-[700px] border rounded-3xl py-5 my-8 shadow-md">
        {#if isSend}
        <h1>入力されたメールアドレス宛にメールを送信しました</h1>
        <h1></h1>

        {:else}
        <h1>パスワードを再設定します</h1>
        <h1>再設定用のページリンクを送信するメールアドレスを入力してください</h1>

        <InputWithValidation
            className="w-96 mb-2"
            type="text"
            placeholder="Email"
            onChange={(value) => {}}
            onBlur={(value) => {return value.length > 0}}
        />
        <InputWithValidation
            className="w-96 mb-2"
            type="text"
            placeholder="Email(Confirm)"
            onChange={(value) => {}}
            onBlur={(value) => {return value.length > 0}}
        />

        <Button
            className="mt-5"
            label="Send"
            onClick={()=>{isSend=true}}
        />
        {/if}
    </Card>

</div>

