<!-- components/RequestBar.vue -->
<template>
  <div>
    <select v-model="method">
      <option v-for="method in methods" :key="method" :value="method">
        {{ method }}
      </option>
    </select>

    <input
      v-model="url"
      type="text"
      placeholder="Enter request URL"
      class="url-input"
    />

    <button @click="sendRequest" :disabled="loading">
      {{ loading ? "Sending..." : "Send" }}
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["response"]);

const url = ref("");
const method = ref("GET");
const loading = ref(false);

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

const sendRequest = async () => {
  if (!url.value) return;

  loading.value = true;

  try {
    const res = await fetch(url.value, {
      method: method.value,
    });

    const contentType = res.headers.get("content-type");

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    emit("response", {
      status: res.status,
      statusText: res.statusText,
      data,
    });
  } catch (err) {
    emit("response", {
      status: "ERROR",
      statusText: err.message,
      data: null,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
