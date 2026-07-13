<script lang="ts">
  import type { WidgetSDK, WidgetProps } from "./types";

  const { sdk }: { sdk: WidgetSDK } = $props();
  let widgetConfig = $state<WidgetProps>(sdk.getProps());

  $effect(() => sdk.on("propsChanged", (p: WidgetProps) => {
    widgetConfig = p;
  }));
</script>

<section class="svelte-widget-section">
  <h3 class="svelte-widget-title">{widgetConfig.title}</h3>
  {#if widgetConfig.description}
    <p class="svelte-widget-description">{widgetConfig.description}</p>
  {/if}
</section>

<style>
  .svelte-widget-section {
    font-family: sans-serif;
    padding: 1rem;
  }

  .svelte-widget-title {
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
    color: #ff3e00;
  }

  .svelte-widget-description {
    margin: 0;
    color: #4a4a4a;
  }
</style>
