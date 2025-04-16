<script setup lang="ts">
import CreateTaskForm from '@/components/task/CreateTaskForm.vue';
import type { Task, TaskStatus } from '@/models/project';
import TasksTable from './TasksTable.vue';


defineProps<{
    status: {
        value: string;
        label: TaskStatus;
    };
    tasks: Task[];
    projectId: number;
}>()
</script>

<template>
    <div>
        <h2 class="status">{{ status.value }}</h2>
        <CreateTaskForm :class="'add-task'" :projectId="projectId" :order="tasks.length + 1" :status="status.label" />
        <TasksTable :tasks="tasks" />
    </div>
</template>

<style scoped>
.status {
    text-align: center;
}

.add-task {
    display: block;
    margin: 0 auto;
}
</style>