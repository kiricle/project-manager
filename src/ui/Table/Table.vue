<script setup lang="ts">
defineProps<{
    withoutTBody?: boolean;
}>()
</script>

<template>
    <div class="projects-table-container">
        <table class="projects-table">
            <thead>
                <slot name="header"></slot>
            </thead>
            <tbody v-if="!withoutTBody">
                <slot name="body"></slot>
            </tbody>'
            <slot v-if="withoutTBody"></slot>
        </table>
    </div>
</template>

<style lang="scss" scoped>
$hover-color: #f5f7fa;

.projects-table-container {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
    margin: 20px 0;
}

.projects-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Segoe UI', sans-serif;
}

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