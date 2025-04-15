<script setup lang="ts">
defineProps<{
    variant: ButtonVariant;
}>()

type ButtonVariant = 'primary' | 'secondary' | 'danger';

const classes: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
}
</script>

<template>
    <button class="btn" :class="classes[variant]">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    transition: all 0.15s ease;
    cursor: pointer;
    border: 1px solid transparent;
    user-select: none;
    min-width: 80px;
    text-align: center;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &-primary {
        background-color: #3b82f6;
        color: white;

        &:hover:not(:disabled) {
            background-color: #2563eb;
        }

        &:active:not(:disabled) {
            background-color: #1d4ed8;
        }
    }

    &-secondary {
        background-color: #e6ebef;
        color: #334155;
        border-color: #e2e8f0;

        &:hover:not(:disabled) {
            background-color: #d5dae1;
        }

        &:active:not(:disabled) {
            background-color: #cbd5e1;
        }
    }

    &-danger {
        background-color: #ef4444;
        color: white;

        &:hover:not(:disabled) {
            background-color: #dc2626;
        }

        &:active:not(:disabled) {
            background-color: #b91c1c;
        }
    }
}
</style>