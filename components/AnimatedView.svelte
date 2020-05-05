<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";

  let element;
  let width;

  onMount(() => {
    width = element.getBoundingClientRect().width;
  });
</script>

<style>
  div {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
</style>

<div
  class="animated-view"
  bind:this={element}
  in:fly={{ x: width, duration: 500, easing: cubicInOut }}
  out:fly={{ x: width, easing: cubicInOut }}>
  <slot />
</div>
