<template>
  <div class="space-y-2">
    <div class="flex gap-2">
      <input placeholder="Key" class="flex-1 px-2 py-1 bg-gray-800 rounded" />
      <input placeholder="Value" class="flex-1 px-2 py-1 bg-gray-800 rounded" />
    </div>
    <table class="table-fixed">
      <!-- v-for rows -->
      <thead>
        <tr>
          <th>h</th>
          <th>h</th>
          <th>h</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>key</td>
          <td>detail</td>
          <td>other</td>
        </tr>
        <tr>
          <td>key</td>
          <td>detail</td>
          <td>other</td>
        </tr>
      </tbody>
    </table>
    <!-- open new row when bottommost has text entered, include delete btn and checkboxes -->
    <!-- should i turn this into a table? -->
  </div>
</template>

<script setup lang="ts">
//var for rows/# of key-value pairs, add new row when user types in last row, add delete button to delete row, add checkbox to enable/disable row
</script>
