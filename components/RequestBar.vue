<template>
  <div class="space-y-2">
    <div
      class="flex gap-3 items-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow"
    >
      <select
        v-model="method"
        class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
      >
        <option v-for="method in HTTPMethods" :key="method" :value="method">
          {{ method }}
        </option>
      </select>

      <input
        v-model="baseUrl"
        type="text"
        placeholder="https://base-url.com"
        class="w-64 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
      />

      <input
        v-model="endpoint"
        type="text"
        placeholder="/users"
        class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        @click="sendRequest"
        :disabled="loading"
        class="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {{ loading ? "Sending..." : "Send" }}
      </button>
    </div>

    <p class="text-xs text-gray-500 px-1 flex items-center gap-1">
      <span>Full URL:</span>
      <span class="font-mono bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
        {{ fullUrl }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "response", payload: ApiResponse): void;
}>();

const baseUrl = ref("");
const endpoint = ref("");
const method = ref<HTTPMethod>("GET");
const loading = ref<boolean>(false);

const fullUrl = computed(() => {
  if (!baseUrl.value) return endpoint.value;

  const base = baseUrl.value.replace(/\/+$/, "");
  const path = endpoint.value.replace(/^\/+/, "");

  return `${base}/${path}`;
});

const sendRequest = async (): Promise<void> => {
  if (!endpoint.value && !baseUrl.value) return;

  loading.value = true;
  const start = performance.now();

  const { data, error } = await tryRequestEndpoint<any>(
    fullUrl.value,
    method.value,
  );

  const duration = Math.round(performance.now() - start);

  if (error) {
    emit("response", {
      status: "ERROR",
      statusText: error.message || "Request failed",
      data: null,
    });
  } else {
    emit("response", {
      status: 200,
      statusText: `OK (${duration} ms)`,
      data,
    });
  }

  loading.value = false;
};
</script>
