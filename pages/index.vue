<template>
  <div class="container">
    <h1>Postman Clone</h1>
    <RequestBar @response="handleResponse" />
    <ResponseViewer :response="response" />
  </div>
</template>

<script setup lang="ts">
const response = ref();

const handleResponse = (res: ApiResponse) => {
  response.value = res;
};
</script>

<style scoped></style>
