<script setup lang="ts">
import { useResize } from '@/composables/useResize';
import type { Project, ProjectStatus } from '@/models/project';
import { useProjectsStore } from '@/stores/projects';
import Badge from '@/ui/Badge.vue';
import Input from '@/ui/Input.vue';
import Resizer from '@/ui/Table/Resizer.vue';
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

const { startResizing } = useResize('.th', 100, 500);


const projectName = ref<string>('')
const status = ref<ProjectStatus | ''>('')

const sortedAndFilteredProjects = computed(() => {
    return [...store.projects].filter((project) => {
        const doesInclude = project.name.toLowerCase().includes(projectName.value.toLowerCase())
        const statusMatch = project.status === status.value

        if (status.value !== '' && projectName.value !== '') {
            return statusMatch && doesInclude
        }

        if (projectName.value !== '') {
            return doesInclude
        }

        if (status.value !== '') {
            return statusMatch
        }

        return true
    }).sort((a, b) => sort(a[sortBy.value], b[sortBy.value], orderBy.value))
})
</script>

<template>
    <div class="search_container">
        <Input v-model:model-value="projectName" label="Пошук по назві" name="projectName" type="search" />
        <select v-model="status" name="status" id="status">
            <option v-for="(item, key) in statusMap" :key="key" :value="key">{{ item }}</option>
            <option value="">Всі статуси</option>
        </select>
    </div>
    <Table>
        <template #header>
            <tr>
                <th class="th" @click="changeSort(key)" v-for="(item, key) in projectMap" :key="item">
                    <div class="header_cell_divider">
                        <p :class="{ 'active': sortBy === key, 'desc': orderBy === 'desc' }">{{ item }}</p>
                        <Resizer v-if="key !== Object.keys(projectMap)[Object.keys(projectMap).length - 1]" @click.stop
                            @mousedown="startResizing" />
                    </div>
                </th>
            </tr>
        </template>
        <template #body>
            <tr @click="goToProject(project.id)" class="project-row" v-for="project in sortedAndFilteredProjects"
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

.search_container {
    background-color: #fff;
    padding: 10px;
}

.header_cell_divider {
    justify-content: space-between;
    display: flex;
}

.th {
    padding: 12px 16px;
    text-align: left;
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
    position: relative;
    user-select: none;
    cursor: pointer;
    min-width: 100px;
    resize: horizontal;

    &:hover {
        background-color: darken(#f8f9fa, 2%);
    }

    .active {
        position: relative;

        &::after {
            content: "▲";
            position: absolute;
            right: -13px;
            top: 50%;
            color: $primary-color;
            translate: 0 -50%;
            font-size: 0.8em;
            transition: .3s rotate;
        }

        &.desc::after {
            rotate: 180deg;
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