<script setup lang="ts">
import TaskColumn from '@/components/task/TaskColumn.vue';
import type { Task, TaskStatus } from '@/models/project';
import { useTasksStore } from '@/stores/tasks';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const projectId = Number(router.currentRoute.value.params.id);

const store = useTasksStore()

const columnMap: Record<TaskStatus, string> = {
  to_do: 'В черзі',
  in_progress: 'В роботі',
  done: 'Готово',
}

const tasks = computed<Task[]>(() => {
  return store.tasks.filter((el) => el.projectId === projectId)
})

onMounted(async () => {
  await store.fetchData()
})

</script>

<template>
  <div class="tasks">
    <h1>This is project details page {{ $route.params.id }}</h1>
    <div class="columns_container">
      <TaskColumn :project-id="projectId" v-for="(status, key) in columnMap" :key="status"
        :status="{ value: status, label: key }" :tasks="tasks.filter((el) => el.status === key)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$font-color: #d0d0d0;

body,
#app {
  width: 2000px;
}

.tasks {
  color: $font-color;
}

.columns_container {
  width: min(1500px, 90%);
  background-color: #fff;
  color: #333;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;

  padding: 10px;
  overflow-x: auto;
}
</style>
