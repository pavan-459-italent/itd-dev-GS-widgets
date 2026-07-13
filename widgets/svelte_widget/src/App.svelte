<script lang="ts">
  import type { WidgetSDK, WidgetProps } from "./types";

  let { sdk }: { sdk: WidgetSDK } = $props();
  let props: WidgetProps = $state(sdk.getProps());

  $effect(() => sdk.on("propsChanged", (newProps: WidgetProps) => {
    props = newProps;
  }));
</script>

<section class="svelte-widget-section">
  <h3 class="svelte-widget-title">{props.title}</h3>
  {#if props.description}
    <p class="svelte-widget-description">{props.description}</p>
  {/if}
</section>
