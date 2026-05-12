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
        class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      />

      <button
        @click="sendRequest"
        :disabled="loading"
        class="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? "Sending..." : "Send" }}
      </button>
    </div>

    <p class="text-xs text-gray-500 px-1">
      {{ fullUrl }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  requestConfig: any;
}>();

const emit = defineEmits<{
  (e: "response", payload: any): void;
}>();

const baseUrl = ref("");
const endpoint = ref("");
const method = ref("GET");
const loading = ref(false);

const HTTPMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const fullUrl = computed(() => {
  if (!baseUrl.value) return endpoint.value;

  const base = baseUrl.value.replace(/\/+$/, "");
  const path = endpoint.value.replace(/^\/+/, "");

  return `${base}/${path}`;
});

const sendRequest = async () => {
  loading.value = true;

  try {
    // QUERY PARAMS
    const queryParams = Object.fromEntries(
      props.requestConfig.params
        .filter((p: any) => p.enabled && p.key)
        .map((p: any) => [p.key, p.value]),
    );

    // HEADERS
    const headers = Object.fromEntries(
      props.requestConfig.headers
        .filter((h: any) => h.enabled && h.key)
        .map((h: any) => [h.key, h.value]),
    );

    // AUTH
    if (
      props.requestConfig.auth.type === "bearer" &&
      props.requestConfig.auth.token
    ) {
      headers.Authorization = `Bearer ${props.requestConfig.auth.token}`;
    }

    // URL
    const url = new URL(fullUrl.value);

    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    // BODY
    let body: any = undefined;

    if (["POST", "PUT", "PATCH"].includes(method.value)) {
      const content = props.requestConfig.body.content;

      if (content) {
        if (props.requestConfig.body.type === "json") {
          body = JSON.stringify(JSON.parse(content));
        } else {
          body = content;
        }
      }
    }

    // REQUEST
    const response = await fetch(url.toString(), {
      method: method.value,
      headers,
      body,
    });

    const data = await response.json();

    emit("response", {
      status: response.status,
      statusText: response.statusText,
      data,
    });
  } catch (error: any) {
    emit("response", {
      status: "ERROR",
      statusText: error.message,
      data: null,
    });
  } finally {
    loading.value = false;
  }
};
</script>
