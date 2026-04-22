<template>
  <div class="flex border-b border-gray-700">
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="activeTab = tab"
      class="px-4 py-2 text-sm"
      :class="[
        activeTab === tab
          ? 'border-b-2 border-blue-500 text-white'
          : 'text-gray-400 hover:text-white',
      ]"
    >
      {{ tab }}
    </button>
  </div>
  <div class="p-4">
    <div v-if="activeTab === 'Params'">
      <!-- Query Params UI -->
      <ParamsEditor v-model="params" />
    </div>

    <div v-else-if="activeTab === 'Headers'">
      <HeadersEditor v-model="headers" />
    </div>

    <div v-else-if="activeTab === 'Body'">
      <BodyEditor v-model="body" />
    </div>

    <div v-else-if="activeTab === 'Auth'">
      <AuthEditor v-model="auth" />
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = ["Params", "Headers", "Body", "Tests"];
const activeTab = ref(tabs[0]);

const params = ref<{ key: string; value: string; enabled: boolean }[]>([
  { key: "", value: "", enabled: true },
]);

const headers = ref<{ key: string; value: string; enabled: boolean }[]>([
  { key: "Content-Type", value: "application/json", enabled: true },
]);

const body = ref({
  type: "json", // json | form-data | raw | x-www-form-urlencoded
  content: "",
});

const auth = ref({
  type: "none", // bearer | basic | api-key
  token: "",
});
</script>

<style scoped></style>
