<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let text = "";

  const send = () => {
    dispatch("send", text);
    text = '';
  };
</script>

<style>
  button {
    margin-top: 1em;
  }
</style>

<div class="card">
  <div class="card-content">
    <textarea
      class="textarea"
      placeholder="sua mensagem aqui..."
      bind:value={text} />
    <button class="button is-primary" on:click={send}>Enviar</button>
  </div>
</div>
