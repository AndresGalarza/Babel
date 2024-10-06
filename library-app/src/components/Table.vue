<template>
  <div>
    <InputComponent v-model="searchQuery" label="Search" />

    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.rowKey">
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in searchRows" :key="rowIndex">
          <td v-for="header in headers" :key="header.rowKey">
            <slot v-if="header.useSlot" :name="header.rowKey" :row="row">{{
              row[header.rowKey]
            }}</slot>
            <template v-else>{{ row[header.rowKey] }}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import InputComponent from "./Input.vue";

interface Header {
  title: string;
  rowKey: string;
  useSlot?: boolean;
}

interface Row {
  [key: string]: any;
}

const props = defineProps<{
  headers: Header[];
  rows: Row[];
}>();

const { headers, rows } = props;

// complement search query
const searchQuery = ref("");

// computed search rows
const searchRows = computed(() => {
  return rows.filter((row) => {
    return Object.values(row).some((value) => {
      return String(value)
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    });
  });
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
