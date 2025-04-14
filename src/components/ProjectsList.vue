<script setup lang="ts">
import type { Project } from '@/models/project';
import Badge from '@/ui/Badge.vue';
import { formatDate } from '@/utils/formatDate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

function goToProject(id: number) {
    console.log(id);
    router.push(`/projects/${id}`);
}

const projects = ref<Project[]>([{
    id: 1,
    name: 'Project A',
    status: 'in_progress',
    createdAt: new Date(),
    description: 'Sample project A description',
    tasks: [],
}, {
    id: 2,
    name: 'Project B',
    status: 'completed',
    createdAt: new Date(),
    description: 'Sample project A description',
    tasks: [],
}, {
    id: 3,
    name: 'Project C',
    status: 'in_progress',
    createdAt: new Date(),
    description: 'Sample project A description',
    tasks: [],
}]);
</script>

<template>
    <div class="projects-table-container">
        <table class="projects-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Tasks</th>
                    <th>Status</th>
                    <th>Created at</th>
                </tr>
            </thead>
            <tbody>
                <tr @click="goToProject(project.id)" class="project-row" v-for="project in projects" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                    <td>{{ project.tasks.length }}</td>
                    <td>
                        <Badge :type="project.status">
                            {{ project.status }}
                        </Badge>
                    </td>
                    <td>{{ formatDate(project.createdAt) }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<style lang="scss" scoped>
/* Основные переменные */
$primary-color: #4a6fa5;
$hover-color: #f5f7fa;
$border-color: #e0e0e0;

/* Контейнер таблицы */
.projects-table-container {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
    margin: 20px 0;
}

/* Стили таблицы */
.projects-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Segoe UI', sans-serif;

    /* Заголовки */
    th {
        padding: 12px 16px;
        text-align: left;
        background-color: #f8f9fa;
        font-weight: 600;
        color: #333;
        position: relative;
        user-select: none;

        &.sortable {
            cursor: pointer;

            &:hover {
                background-color: darken(#f8f9fa, 2%);
            }
        }

        .sort-icon {
            margin-left: 5px;
            font-size: 12px;
        }
    }

    /* Ячейки */
    td {
        padding: 12px 16px;
        border-top: 1px solid $border-color;
        vertical-align: middle;
        color: $primary-color;
    }

    /* Строки */
    .project-row {
        transition: background-color 0.2s;
        cursor: pointer;

        &:hover {
            background-color: $hover-color;
        }

        &:last-child td {
            border-bottom: none;
        }
    }
}

/* Адаптивность */
@media (max-width: 768px) {
    .projects-table {

        th,
        td {
            padding: 8px 12px;
            font-size: 14px;
        }
    }
}
</style>