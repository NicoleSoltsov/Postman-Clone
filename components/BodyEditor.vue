<template>
  <div class="space-y-2">
    <!-- toolbar -->
    <div class="flex items-center gap-4">
      <select
        v-model="contentType"
        class="bg-gray-800 text-gray-300 px-2 py-1 rounded"
      >
        <option value="json">JSON</option>
        <option value="text">Text</option>
        <option value="xml">XML</option>
      </select>
      <button
        @click="formatBody"
        class="bg-gray-700 hover:bg-gray-600 px-2 py-1 text-sm rounded text-gray-200"
      >
        Format
      </button>
      <div v-if="error" class="text-red-400 text-sm">{{ error }}</div>
    </div>

    <!-- bodyeditor -->
    <div class="relative flex">
      <!-- line #s -->
      <div class="text-right pr-2 text-gray-500 select-none bg-gray-200 py-2">
        <div
          v-for="lineNumber in lineCount"
          :key="lineNumber"
          class="leading-5 text-xs"
        >
          {{ lineNumber }}
        </div>
      </div>
      <textarea
        v-model="body"
        placeholder="Enter request body..."
        class="flex-1 px-2 py-2 rounded-r outline-none resize-none font-mono text-sm leading-5 h-64"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
const error = ref("");
const contentType = ref<"json" | "text" | "xml">("json");
const body = ref("");
const lineCount = computed(() => {
  return body.value.split("\n").length;
});

function formatBody() {
  error.value = "";
  if (contentType.value === "json") {
    try {
      const parsed = JSON.parse(body.value);
      body.value = JSON.stringify(parsed, null, 2); //the 2 is the indent
    } catch (e) {
      error.value = "Invalid JSON"; //can only format if in valid JSON
    }
  }
}

watch(body, () => {
  if (contentType.value === "json") {
    try {
      JSON.parse(body.value);
      error.value = "";
    } catch {
      error.value = "Invalid JSON";
    }
  } else {
    error.value = "";
  }
});
</script>

<style scoped></style>
