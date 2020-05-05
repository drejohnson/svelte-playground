<script>
  import AnimatedView from "../components/AnimatedView.svelte";
</script>

<style>
  div {
    background-color: indianred;
  }
  :global(.view) {
    margin-top: 48px;
  }
</style>

<AnimatedView>
  <div class="view">
    <h3>This here is the watch component, enjoy</h3>
  </div>
</AnimatedView>
