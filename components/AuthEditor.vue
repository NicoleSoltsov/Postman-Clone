<template>
  <div class="space-y-4">
    <select v-model="model.type" class="border p-2 rounded">
      <option value="none">None</option>
      <option value="bearer">Bearer Token</option>
    </select>

    <input
      v-if="model.type === 'bearer'"
      v-model="model.token"
      placeholder="Enter token"
      class="w-full border p-2 rounded"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<any>({
  required: true,
});
</script>
