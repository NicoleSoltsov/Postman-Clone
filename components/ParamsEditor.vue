<template>
  <div class="w-full bg-white rounded-lg">
    <div class="divide-y">
      <div
        v-for="(row, index) in model"
        :key="index"
        class="grid grid-cols-12 items-center px-4 py-2 gap-2 hover:bg-gray-50"
      >
        <div class="col-span-1 flex justify-center">
          <input type="checkbox" class="w-4 h-4" v-model="row.enabled" />
        </div>
        <input
          type="text"
          placeholder="Key"
          class="col-span-4 px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 outline-none font-mono"
          v-model="row.key"
          @input="onInput(index)"
        />

        <input
          type="text"
          placeholder="Value"
          class="col-span-5 px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 outline-none font-mono"
          v-model="row.value"
          @input="onInput(index)"
        />

        <div class="col-span-2 flex justify-end" v-if="model.length > 1">
          <button
            class="text-gray-400 hover:text-red-500"
            @click="deleteRow(index)"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <button @click="addRow" class="bg-blue-500 text-white px-3 py-1 rounded">
      Add
    </button>
  </div>
</template>

<script setup lang="ts">
type ParamRow = {
  key: string;
  value: string;
  enabled: boolean;
};

const model = defineModel<ParamRow[]>({
  required: true,
});

function addRow() {
  model.value.push({
    key: "",
    value: "",
    enabled: true,
  });
}

function deleteRow(index: number) {
  model.value.splice(index, 1);
}

function onInput(index: number) {
  // only react if typing in the last row
  const isLast = index === model.value.length - 1;

  if (!isLast) return;

  const row = model.value[index];
  if (!row) return;
  const hasContent = row.key.trim() !== "" || row.value.trim() !== "";

  // add a new empty row once user starts typing
  if (hasContent) {
    addRow();
  }
}
</script>
