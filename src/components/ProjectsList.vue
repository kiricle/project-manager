<script setup lang="ts">
import type { Project } from '@/models/project';
import { useProjectsStore } from '@/stores/projects';
import Badge from '@/ui/Badge.vue';
import Table from '@/ui/Table/Table.vue';
import { formatDate } from '@/utils/formatDate';
import { projectMap, statusMap } from '@/utils/projectMap';
import { sort } from '@/utils/sort';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter()

function goToProject(id: number) {
    router.push(`/projects/${id}`);
}

const store = useProjectsStore();

onMounted(async () => {
    store.fetchData()
});

type SortBy = Exclude<keyof Project, 'description' | 'createdAt'>

const sortBy = ref<SortBy>('id')
const orderBy = ref<'asc' | 'desc'>('desc')

const sortedProjects = computed(() => {
    return [...store.projects].sort((a, b) => sort(a[sortBy.value], b[sortBy.value], orderBy.value))
})

const changeSort = (key: keyof typeof projectMap) => {
    if (key === 'createdAt') {
        toast.warning('Сортування по даті створення не підтримується')
        return;
    }

    if (sortBy.value === key) {
        orderBy.value = orderBy.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortBy.value = key
        orderBy.value = 'asc'
    }
}

</script>

<template>
    <Table>
        <template #header>
            <tr>
                <th class="th" @click="changeSort(index)" v-for="(item, index) in projectMap" :key="item"
                    :class="{ 'active': sortBy === index, 'desc': orderBy === 'desc' }">
                    {{ item }}
                </th>
            </tr>
        </template>
        <template #body>
            <tr @click="goToProject(project.id)" class="project-row" v-for="project in sortedProjects"
                :key="project.id">
                <td>{{ project.id }}</td>
                <td>{{ project.name }}</td>
                <td>{{ project.tasksId.length }}</td>
                <td>
                    <Badge :type="project.status">
                        {{ statusMap[project.status] }}
                    </Badge>
                </td>
                <td>{{ formatDate(project.createdAt) }}</td>
            </tr>
        </template>
    </Table>
</template>

<style lang="scss" scoped>
$primary-color: #4a6fa5;
$hover-color: #f5f7fa;
$border-color: #e0e0e0;

.th {
    padding: 12px 16px;
    text-align: left;
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
    position: relative;
    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: darken(#f8f9fa, 2%);
    }

    &.active {
        &::after {
            content: "▲";
            position: absolute;
            right: 8px;
            top: 50%;
            color: $primary-color;
            translate: 0 -50%;
            font-size: 0.8em;
            transition: .3s transform;
        }

        &.desc::after {
            transform: rotate(180deg);
        }
    }
}


.project-row {
    transition: background-color 0.2s;
    cursor: pointer;

    td {
        padding: 12px 16px;
        border-top: 1px solid $border-color;
        vertical-align: middle;
        color: $primary-color;
    }

    &:hover {
        background-color: $hover-color;
    }

    &:last-child td {
        border-bottom: none;
    }
}
</style>