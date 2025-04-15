<script setup lang="ts">
import { useResize } from '@/composables/useResize';
import type { Task } from '@/models/project';
import Resizer from '@/ui/Table/Resizer.vue';
import Table from '@/ui/Table/Table.vue';
import { formatDate } from '@/utils/formatDate';
import { tasksMap } from '@/utils/projectMap';

const props = defineProps<{
    tasks: Task[];
}>()

const { startResizing } = useResize('.th', 75, 500);
</script>

<template>
    <Table>
        <template #header>
            <tr class="project-row">
                <th v-for="(column, key) in tasksMap" :key="key" class="th">
                    <div class="header_cell_divider">
                        <p>{{ column }}</p>
                        <Resizer @click.stop @mousedown="startResizing"
                            v-if="key !== Object.keys(tasksMap)[Object.keys(tasksMap).length - 1]" />
                    </div>
                </th>
            </tr>
        </template>

        <template #body>
            <tr class="project-row" v-for="task in tasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.name }}</td>
                <td>{{ task.assigneeName }}</td>
                <td>{{ formatDate(task.completeTo) }}</td>
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