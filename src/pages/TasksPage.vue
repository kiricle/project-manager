<script setup lang="ts">
import TaskColumn from '@/components/TaskColumn.vue';
import type { Task, TaskStatus } from '@/models/project';
import { ref } from 'vue';

const tasks = ref<Task[]>([
  {
    "id": 1,
    "name": "Task A",
    "status": "done",
    "completeTo": "2012-04-23T18:25:43.511Z",
    "assigneeName": "John",
    "order": 1,
    "projectId": 2
  },
  {
    "id": 2,
    "name": "Task B",
    "status": "in_progress",
    "completeTo": "2012-04-23T18:25:43.511Z",
    "assigneeName": "John",
    "order": 2,
    "projectId": 2
  }
])

const columnMap: Record<TaskStatus, string> = {
  to_do: 'В черзі',
  in_progress: 'В роботі',
  done: 'Готово',
}
</script>

<template>
  <div class="tasks">
    <h1>This is project details page {{ $route.params.id }}</h1>
    <div class="columns_container">
      <TaskColumn v-for="(status) in columnMap" :key="status" :status="status" :tasks="tasks" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$font-color: #d0d0d0;
body, #app {
  width: 2000px;
}

.tasks {
  color: $font-color;
}

.columns_container {
  width: min(1500px, 90%);
  background-color: #fff;
  color: #333;
  // display: flex;
  // justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 2fr;
  padding: 10px;
  overflow-x: auto;
  gap: 10px;
}
</style>
