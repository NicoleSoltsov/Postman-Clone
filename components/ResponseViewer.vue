<template>
  <div class="p-4">
    <div v-if="response" class="space-y-3">
      <div class="flex gap-4 text-sm">
        <span>Status: {{ response.status }} {{ response.statusText }}</span>
        <span>Time: {{ response.time }}ms</span>

        <select
          v-model="formatType"
          class="ml-auto px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
        >
          <option v-for="formatOption in formatOptions" :value="formatOption">
            {{ formatOption }}
          </option>
        </select>
      </div>

      <div class="bg-gray-900 text-white p-4 rounded text-sm overflow-auto">
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
const formatOptions = [
  "JSON",
  "XML",
  "HTML",
  "JavaScript",
  "Markdown",
  "Raw",
  "Hex",
  "Base64",
] as const;
type FormatOption = (typeof formatOptions)[number];
const formatType = ref<FormatOption>("JSON");

const rawData = computed(() => {
  if (!props.response) return "";
  return props.response.data;
});

const formattedData = computed(() => {
  if (!props.response) return "";
  //???????
});

const displayData = computed(() => {
  return isFormatted.value ? formattedData.value : rawData.value;
});
</script>

<style scoped></style>
