<script>
  import AnimatedView from "../components/AnimatedView.svelte";

  export let pushView;
</script>

<style>
  div {
    background-color: green;
  }
  :global(.view) {
    margin-top: 48px;
  }
</style>

<AnimatedView>
  <div class="view">
    <h3
      on:click={() => pushView({ component: 'Shows', name: 'Shows' })}>
      Click here to go to show component
    </h3>
  </div>
</AnimatedView>
