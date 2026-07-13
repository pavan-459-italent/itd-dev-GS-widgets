<template>
  <section class="vue-widget-section">
    <h3 class="vue-widget-title">{{ widgetConfig.title }}</h3>
    <p v-if="widgetConfig.description" class="vue-widget-description">
      {{ widgetConfig.description }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import type { WidgetSDK, WidgetProps } from "./types";

const { sdk } = defineProps<{ sdk: WidgetSDK }>();
const widgetConfig = ref<WidgetProps>(sdk.getProps());
const cleanup = sdk.on("propsChanged", (p: WidgetProps) => {
  widgetConfig.value = p;
});

onUnmounted(cleanup);
</script>

<style scoped>
.vue-widget-section {
  font-family: sans-serif;
  padding: 1rem;
}

.vue-widget-title {
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
  color: #42b883;
}

.vue-widget-description {
  margin: 0;
  color: #4a4a4a;
}
</style>
