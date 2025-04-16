<script setup lang="ts">
import type { ProjectStatus, TaskStatus } from '@/models/project';

const props = defineProps<{
    type: ProjectStatus | TaskStatus,
}>();

const classes: Record<typeof props.type, string> = {
    completed: 'completed',
    in_progress: 'in_progress',
    to_do: 'to_do',
    done: 'completed',
}
</script>

<template>
    <span class="status-badge" :class="classes[props.type]">
        <slot></slot>
    </span>
</template>

<style lang="scss" scoped>
$status-active: #4194cc;
$status-completed: #2ecc71;
$status-to-do: #e67e22;

.status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;

    &.in_progress {
        background-color: rgba($status-active, 0.1);
        color: $status-active;
    }

    &.completed {
        background-color: rgba($status-completed, 0.1);
        color: $status-completed;
    }

    &:to_do {
        background-color: rgba($status-to-do, 0.1);
        color: $status-to-do;
    }
}
</style>