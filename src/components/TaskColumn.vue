<script setup lang="ts">
import type { Task } from '@/models/project';
import TasksTable from './TasksTable.vue';


defineProps<{
    status: string;
    tasks: Task[]
}>()
</script>

<template>
    <div>
        <h2 class="status">{{ status }}</h2>

        <TasksTable :tasks="tasks" />
    </div>
</template>

<style scoped>
.status {
    text-align: center;
}
</style>