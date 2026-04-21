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
        <pre>{{ displayData }}</pre>
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
  if (!rawData.value) return "";
  try {
    switch (formatType.value) {
      case "JSON":
        return typeof rawData.value === "string"
          ? JSON.stringify(JSON.parse(rawData.value), null, 2)
          : JSON.stringify(rawData.value, null, 2);
      case "XML":
        return formatXML(rawData.value);
      case "HTML":
        return formatHTML(rawData.value);
      case "JavaScript":
        return formatJS(rawData.value);
      case "Markdown":
        return rawData.value; // usually already readable
      case "Hex":
        return toHex(rawData.value);
      case "Base64":
        return toBase64(rawData.value);
      case "Raw":
      default:
        return rawData.value;
    }
  } catch (err) {
    return `Formatting error: ${String(err)}`;
  }
});

function formatXML(xml: string) {
  const PADDING = "  ";
  const reg = /(>)(<)(\/*)/g;
  let formatted = "";
  let pad = 0;

  xml = xml.replace(reg, "$1\n$2$3");

  xml.split("\n").forEach((node) => {
    let indent = 0;

    if (node.match(/^<\/\w/)) {
      if (pad > 0) pad -= 1;
    } else if (node.match(/^<\w([^>]*[^/])?>.*$/)) {
      indent = 1;
    }

    formatted += PADDING.repeat(pad) + node + "\n";
    pad += indent;
  });

  return formatted.trim();
}

function formatHTML(html: string) {
  return formatXML(html);
}

function formatJS(js: string) {
  try {
    return new Function(`return ${js}`)().toString();
  } catch {
    return js; // If it fails, return the original string
  }
}

function toHex(str: string) {
  return Array.from(str)
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join(" ");
}

function toBase64(str: string) {
  return btoa(str);
}

const displayData = computed(() => {
  return isFormatted.value ? formattedData.value : rawData.value;
});
</script>

<style scoped></style>
