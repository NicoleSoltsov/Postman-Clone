<template>
  <div>
    <div class="flex border-b border-gray-700">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        class="px-4 py-2 text-sm"
        :class="
          activeTab === tab
            ? 'border-b-2 border-blue-500 text-black'
            : 'text-gray-400 hover:text-black'
        "
      >
        {{ tab }}
      </button>
    </div>

    <div class="p-4">
      <div v-if="activeTab === 'Params'">
        <ParamsEditor v-model="model.params" />
      </div>

      <div v-else-if="activeTab === 'Headers'">
        <HeadersEditor v-model="model.headers" />
      </div>

      <div v-else-if="activeTab === 'Body'">
        <BodyEditor v-model="model.body" />
      </div>

      <div v-else-if="activeTab === 'Auth'">
        <AuthEditor v-model="model.auth" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = ["Params", "Headers", "Body", "Auth"];

const activeTab = ref("Params");

const model = defineModel<any>({
  required: true,
});
</script>
