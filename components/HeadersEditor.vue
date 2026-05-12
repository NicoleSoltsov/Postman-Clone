<template>
  <ParamsEditor v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel<any[]>({
  required: true,
});
</script>
