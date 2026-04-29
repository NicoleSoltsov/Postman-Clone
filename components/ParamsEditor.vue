<template>
  <div class="w-full bg-white rounded-lg">
    <div class="divide-y">
      <div
        v-for="(row, index) in modelValue"
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

        <div class="col-span-2 flex justify-end" v-if="modelValue.length > 1">
          <button
            class="text-gray-400 hover:text-red-500"
            @click="deleteRow(index)"
          >
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

type ParamRow = { key: string; value: string; enabled: boolean };

const props = defineProps<{
  modelValue: ParamRow[];
}>();

const emit = defineEmits(["update:modelValue"]);

function update(rows: ParamRow[]) {
  emit("update:modelValue", rows);
}

function addRow() {
  //updates w new row added
  update([...props.modelValue, { key: "", value: "", enabled: true }]);
}

function deleteRow(index: number) {
  const newRows = [...props.modelValue];
  newRows.splice(index, 1);
  update(newRows);
}

function onInput(index: number) {
  const rows = [...props.modelValue];

  const isLast = index === rows.length - 1;
  const row = rows[index];

  const hasContent = row && (row.key.trim() !== "" || row.value.trim() !== "");

  if (isLast && hasContent) {
    rows.push({ key: "", value: "", enabled: true });
    update(rows);
  }
}
</script>
