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
</template>

<script setup lang="ts">
const tabs = ["Params", "Headers", "Body", "Tests"];
const activeTab = ref(tabs[0]);
</script>

<style scoped></style>
