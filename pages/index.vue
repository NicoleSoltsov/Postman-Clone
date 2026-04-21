<template>
  <div class="container">
    <h1>Postman Clone</h1>
    <RequestBar @response="handleResponse" />
    <ParamsTabs />
    <div class="">
      <!-- split side by side -->
      <ParamsInput />
      <ResponseViewer :response="response" />
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
