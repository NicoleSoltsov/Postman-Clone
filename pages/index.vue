<template>
  <div class="space-y-4 p-6">
    <RequestBar :request-config="requestConfig" @response="response = $event" />

    <InputTabs v-model="requestConfig" />
    <!-- should depend on http request -->

    <ResponseViewer :response="response" />
  </div>
</template>

<script setup lang="ts">
export interface KeyValueItem {
  key: string;
  value: string;
  enabled: boolean;
}

export interface RequestConfig {
  params: KeyValueItem[];
  headers: KeyValueItem[];
  body: {
    type: string;
    content: string;
  };
  auth: {
    type: string;
    token: string;
  };
}

const requestConfig = reactive<RequestConfig>({
  params: [{ key: "", value: "", enabled: true }],

  headers: [
    {
      key: "Content-Type",
      value: "application/json",
      enabled: true,
    },
  ],

  body: {
    type: "json",
    content: "",
  },

  auth: {
    type: "none",
    token: "",
  },
});

const response = ref<any>(null);
</script>
