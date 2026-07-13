<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import type { WidgetSDK, WidgetProps } from "./types";

const { sdk } = defineProps<{ sdk: WidgetSDK }>();

const widgetProps = ref<WidgetProps>(sdk.getProps());

const unsubscribe = sdk.on("propsChanged", (newProps: WidgetProps) => {
  widgetProps.value = newProps;
});

onUnmounted(() => unsubscribe());
</script>

<template>
  <section class="vue-widget-section">
    <h3 class="vue-widget-title">{{ widgetProps.title }}</h3>
    <p v-if="widgetProps.description" class="vue-widget-description">{{ widgetProps.description }}</p>
  </section>
</template>
