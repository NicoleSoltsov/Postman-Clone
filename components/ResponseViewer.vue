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
  if (formatType.value === "Raw") return rawData.value;
  else if (formatType.value === "Hex") {
    return rawData.value
      .split("")
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(" ");
  } else if (formatType.value === "Base64") {
    return btoa(rawData.value);
  } else {
    try {
      const contentType = props.response.headers["content-type"] || "";
      if (
        formatType.value === "JSON" &&
        contentType.includes("application/json")
      ) {
        return JSON.stringify(JSON.parse(rawData.value), null, 2);
      } else if (
        formatType.value === "XML" &&
        contentType.includes("application/xml")
      ) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rawData.value, "application/xml");
        const serializer = new XMLSerializer();
        return serializer.serializeToString(xmlDoc);
      } else if (
        formatType.value === "HTML" &&
        contentType.includes("text/html")
      ) {
        return rawData.value;
      } else if (
        formatType.value === "JavaScript" &&
        contentType.includes("application/javascript")
      ) {
        return rawData.value;
      } else if (
        formatType.value === "Markdown" &&
        contentType.includes("text/markdown")
      ) {
        return rawData.value;
      }
    } catch (e) {
      return `Error formatting data: ${e}`;
    }
    return rawData.value;
  }
});

const displayData = computed(() => {
  return isFormatted.value ? formattedData.value : rawData.value;
});
</script>

<style scoped></style>
