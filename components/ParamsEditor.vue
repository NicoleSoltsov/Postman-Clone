<template>
  <div class="w-full bg-white rounded-lg x">
    <div class="divide-y">
      <div
        v-for="row in rows"
        class="grid grid-cols-12 items-center px-4 py-2 gap-2 hover:bg-gray-50"
      >
        <div class="col-span-1 flex justify-center">
          <input
            type="checkbox"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded"
            v-model="row.enabled"
          />
        </div>

        <input
          type="text"
          placeholder="Key"
          class="col-span-4 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="row.key"
        />

        <input
          type="text"
          placeholder="Value"
          class="col-span-5 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="row.value"
        />

        <div class="col-span-2 flex justify-end space-x-2">
          <button class="text-gray-400 hover:text-gray-600" @click="deleteRow">
            ✕
          </button>
        </div>
      </div>
    </div>

    <div class="px-4 py-2">
      <button class="text-sm text-blue-600 hover:underline" @click="addRow">
        + Add Param
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
//var for rows/# of key-value pairs, add new row when user types in last row, add delete button to delete row, add checkbox to enable/disable
const rows = ref([{ key: "", value: "", enabled: true }]);

function addRow() {
  rows.value.push({ key: "", value: "", enabled: true });
}

function deleteRow(index: number) {
  rows.value.splice(index, 1);
}
</script>
