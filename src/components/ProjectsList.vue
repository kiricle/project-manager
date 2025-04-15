<script setup lang="ts">
import { useResize } from '@/composables/useResize';
import type { Project } from '@/models/project';
import { useProjectsStore } from '@/stores/projects';
import Badge from '@/ui/Badge.vue';
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

const { startResizing } = useResize('.th');

// const resizingElement = ref<HTMLElement | null>(null)
// const startPosX = ref<number>(0)

// function startResizing(e: MouseEvent) {
//     console.log('startResizing')
//     const resizer = e.target as HTMLButtonElement;
//     resizingElement.value = resizer.closest('.th') as HTMLElement;
//     startPosX.value = e.clientX;


//     console.log(startPosX.value)
//     document.addEventListener('mouseup', stopResizing);
//     document.addEventListener('mousemove', resize);
// }

// function stopResizing(e: MouseEvent) {
//     console.log('stopResizing')

//     document.removeEventListener('mousemove', resize);
//     document.removeEventListener('mouseup', stopResizing);
// }

// function resize(e: MouseEvent) {
//     if (!resizingElement.value) return;
//     const currentWidth = resizingElement.value.offsetWidth;
//     const calculatedWidth = currentWidth + (e.clientX - startPosX.value);
//     if (calculatedWidth < 100) return;
//     if (calculatedWidth > 500) return;

//     resizingElement.value.style.width = `${currentWidth + (e.clientX - startPosX.value)}px`;
//     startPosX.value = e.clientX;
// }

</script>

<template>
    <Table>
        <template #header>
            <tr>
                <th class="th" @click="changeSort(index)" v-for="(item, index) in projectMap" :key="item">
                    <div class="header_cell_divider">
                        <p :class="{ 'active': sortBy === index, 'desc': orderBy === 'desc' }">{{ item }}</p>
                        <Resizer @click.stop @mousedown="startResizing" />
                    </div>
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