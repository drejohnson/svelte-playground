<script>
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { fly, fade, scale } from "svelte/transition";
  import { cubicInOut, quintOut } from "svelte/easing";

  import { stackView } from "../stores/stores.js";
  import * as View from "../views";

  let element;
  let clickEl;
  let width;
  let title;
  let name;
  let isBackButton;
  let isTitle;
  let isHidden;
  let clickEvt;

  const views = stackView([
    {
      component: "Browse",
      name: "Browse"
    }
  ]);

  let view = {
    stack: [
      {
        component: "Browse",
        name: "Browse"
      }
    ],
    length: 1
  };

  function pushView(viewStack) {
    // view.length++;
    // view.stack = [...view.stack, viewStack];
    views.push(viewStack);
  }

  function popView(e) {
    // view.stack = view.stack.slice(0, view.stack.length - 1);
    views.pop();
  }

  onMount(() => {
    width = element.getBoundingClientRect().width;
  });

  $: $views.map((v, i) => {
    isHidden = i < views.length - 2;
    isBackButton = i === views.length - 2;
    isTitle = i === views.length - 1;
    if (isBackButton) {
      name = v.name;
    }
    if (isTitle) {
      title = v.name;
    }
  });
</script>

<style>
  .fixed-container {
    position: fixed;
    top: 60px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    box-sizing: border-box;
  }
  .view-stack {
    position: relative;
    width: 100%;
    flex: 1 1 0%;
    margin-top: 48px;
    margin-bottom: 64px;
    overflow: hidden;
  }
  header {
    z-index: 2;
    position: absolute;
    display: flex;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 90px;
  }
  .view-heading {
    position: absolute;
    margin-top: 48px;
    margin-left: 24px;
  }
  h1 {
  }
  .prev-view {
    color: indianred;
    font-size: 1.25rem;
    font-weight: 400;
  }
  h2 {
    font-size: 1.25rem;
  }
  .icon {
    fill: var(--phreshr-white);
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 auto;
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<div class="fixed-container">
  <header>
    {#each $views as { component, name }, i}
      {#if i >= $views.length - 2}
        <div
          class="view-heading"
          style={i === $views.length - 2 ? 'margin-top: var(--spacing-md);' : ''}>
          {#if i === $views.length - 2}
            <h1
              class="prev-view"
              on:click={popView}
              in:scale={{ start: 0.25, duration: 500, easing: quintOut }}
              out:scale={{ start: 0.25, duration: 200, easing: quintOut }}>
              <span>
                <svg class="icon icon-chevron-left">
                  <use xlink:href="#icon-chevron-left" />
                </svg>
              </span>
               {name || component}
            </h1>
          {/if}
          {#if i === $views.length - 1}
            <h1
              bind:this={clickEl}
              in:fly={{ x: width, delay: 100, easing: cubicInOut }}
              out:fly={{ x: width, easing: cubicInOut }}>
               {name || component}
            </h1>
          {/if}
        </div>
      {/if}
    {/each}
  </header>

  <div bind:this={element} class="view-stack">
    {#each $views as { component }}
      <svelte:component this={View[component]} {pushView} />
    {/each}
  </div>

  <pre>{JSON.stringify($views, null, '  ')}</pre>
</div>
