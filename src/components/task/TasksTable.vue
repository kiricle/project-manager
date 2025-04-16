<script setup lang="ts">
import { useResize } from '@/composables/useResize';
import type { Task } from '@/models/project';
import { useTasksStore } from '@/stores/tasks';
import Button from '@/ui/Button.vue';
import Resizer from '@/ui/Table/Resizer.vue';
import Table from '@/ui/Table/Table.vue';
import { formatDate } from '@/utils/formatDate';
import { tasksMap } from '@/utils/projectMap';
import { sort } from '@/utils/sort';
import { computed, ref } from 'vue';
import { toast } from 'vue3-toastify';
import draggable from 'vuedraggable';

const props = defineProps<{
    tasks: Task[];
}>()

const store = useTasksStore()

const { startResizing } = useResize('.th', 75, 500);

const dragEnd = (e: { oldIndex: number, newIndex: number }) => {
    if (sortBy.value !== 'order' && orderBy.value !== 'asc') return;
    if (e.oldIndex === e.newIndex) return;
    const { status, projectId } = props.tasks[0];
    store.updateTaskOrder(status, e.oldIndex + 1, e.newIndex + 1, projectId)
}

const sortBy = ref<keyof Pick<Task, 'completeTo' | 'order'>>('order');
const orderBy = ref<'asc' | 'desc'>('asc')

const sortedTasks = computed(() => {
    return [...props.tasks].sort((a, b) => sort(a[sortBy.value], b[sortBy.value], orderBy.value))
})

const changeSort = (key: keyof typeof tasksMap) => {
    if (key !== 'completeTo') {
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

const toDefaultSort = () => {
    sortBy.value = 'order'
    orderBy.value = 'asc'
}
</script>

<template>
    <Button variant="danger" @click="toDefaultSort" v-if="sortBy !== 'order'">Скинути сортування</Button>
    <Table :without-t-body="true">
        <template #header>
            <tr class="project-row">
                <th @click="changeSort(key)" v-for="(column, key) in tasksMap" :key="key" class="th">
                    <div class="header_cell_divider">
                        <p :class="{ 'active': sortBy === key, 'desc': orderBy === 'desc' }">{{ column }}</p>
                        <Resizer @click.stop @mousedown="startResizing"
                            v-if="key !== Object.keys(tasksMap)[Object.keys(tasksMap).length - 1]" />
                    </div>
                </th>
            </tr>
        </template>
        <draggable tag="tbody" group="tasks" :list="sortedTasks" item-key="id" @end="dragEnd">
            <template #item="{ element: task }: { element: Task }">
                <tr class="project-row">
                    <td>{{ task.id }}</td>
                    <td>{{ task.name }}</td>
                    <td>{{ task.assigneeName }}</td>
                    <td>{{ formatDate(task.completeTo) }}</td>
                </tr>
            </template>
        </draggable>

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

.ghost-row {
    opacity: 0.5;
    background: #c8ebfb;
}

.chosen-row {
    transform: rotate(3deg);
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