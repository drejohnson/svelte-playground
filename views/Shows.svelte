<script>
  import AnimatedView from "../components/AnimatedView.svelte";

  export let pushView;
</script>

<style>
  div {
    background-color: teal;
  }
  :global(.view) {
    margin-top: 48px;
  }
</style>

<AnimatedView>
  <div class="view">
    <h3 on:click={() => pushView({ component: 'Watch', name: 'Watch' })}>
      Click here to go to watch component
    </h3>
  </div>
</AnimatedView>
