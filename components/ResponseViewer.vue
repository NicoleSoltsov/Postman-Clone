<template>
  <div>
    <div v-if="response">
      <div>
        <strong>Status:</strong>
        {{ response.status }} {{ response.statusText }}
      </div>

      <div>{{ formattedData }}</div>
    </div>

    <div v-else>No response yet</div>
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
