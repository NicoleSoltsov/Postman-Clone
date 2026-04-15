<template>
  <div class="p-4">
    <div v-if="response" class="space-y-3">
      <div class="flex gap-4 text-sm">
        <span>Status: {{ response.status }} {{ response.statusText }}</span>
        <span>Time: {{ response.time }}ms</span>

        <button
          @click="isFormatted = !isFormatted"
          class="ml-auto px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
        >
          {{ isFormatted ? "Raw" : "Format JSON" }}
        </button>
      </div>

      <div class="bg-gray-900 text-white p-4 rounded text-sm whitespace-pre">
        {{ displayData }}
      </div>
    </div>

    <div v-else class="text-gray-500">No response yet</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  response: Object,
});

const isFormatted = ref(true);

const formattedData = computed(() => {
  if (!props.response?.data) return "";

  try {
    return JSON.stringify(props.response.data, null, 2);
  } catch {
    return props.response.data;
  }
});

const rawData = computed(() => {
  if (!props.response?.data) return "";

  try {
    return JSON.stringify(props.response.data);
  } catch {
    return props.response.data;
  }
});

const displayData = computed(() => {
  return isFormatted.value ? formattedData.value : rawData.value;
});
</script>

<style scoped></style>
