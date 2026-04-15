<template>
  <div class="p-4">
    <div v-if="response" class="space-y-3">
      <div class="flex gap-4 text-sm">
        <span>Status: {{ response.status }} {{ response.statusText }}</span>
        <span>Time: {{ response.time }}ms</span>
      </div>

      <div class="bg-gray-900 text-green-400 p-4 rounded overflow-auto text-sm">
        {{ JSON.stringify(response.data, null, 2) }}
      </div>
    </div>

    <div v-else class="text-gray-500">No response yet</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  response: Object,
});

const formattedData = computed(() => {
  if (!props.response?.data) return "";

  try {
    return JSON.stringify(props.response.data, null, 2);
  } catch {
    return props.response.data;
  }
});
</script>

<style scoped></style>
