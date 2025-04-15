<script setup lang="ts">
defineProps<{
    modelValue: string,
    label: string,
    name: string,
    className?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
    <div class="input-wrapper" :class="className">
        <label v-if="label" class="input-label" :for="name">{{ label }}</label>

        <input v-bind="$attrs" :id="name" :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" class="input-element">
    </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
    width: 100%;
    margin-bottom: 1rem;
}

.input-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #334155;
}

.input-container {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    transition: border-color 0.2s;

    &:focus-within {
        border-color: #3b82f6;
        box-shadow: 0 0 0 1px #3b82f6;
    }
}

.input-element {
    width: 100%;
    padding: 0.75rem;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;

    &:focus-within {
        border-color: #3b82f6;
        box-shadow: 0 0 0 1px #3b82f6;
    }
}

/* Иконки в слотах */
::v-slots(prefix, suffix) {
    position: absolute;
    display: flex;
    padding: 0 0.75rem;
    color: #64748b;
}
</style>