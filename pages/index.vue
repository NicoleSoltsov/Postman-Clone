<template>
  <div class="container">
    <h1>Postman Clone</h1>
    <RequestBar @response="handleResponse" />
    <InputTabs />
    <div class="flex gap-4 mt-4">
      <ResponseViewer :response="response" class="" />
    </div>
  </div>
</template>

<script setup lang="ts">
const response = ref();

const handleResponse = (res: ApiResponse) => {
  response.value = res;
};
</script>

<style scoped></style>
