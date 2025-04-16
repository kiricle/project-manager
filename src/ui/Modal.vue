<script setup lang="ts">
import Button from './Button.vue';

defineProps<{
    isOpen: boolean;
    title: string;
    closeText: string;
}>()

const emit = defineEmits<{
    (e: 'update:isOpen', value: boolean): void;
}>()
</script>

<template>
    <transition name="modal">
        <teleport to='body' v-if="isOpen" class="mask">
            <div class="overlay">
                <div class="container" @click.stop>
                    <div class="header">
                        <slot name="header">
                            <h3>{{ title }}</h3>
                        </slot>
                        <button class="close" @click="emit('update:isOpen', false)">
                            &times;
                        </button>
                    </div>

                    <div class="body">
                        <slot></slot>
                    </div>

                    <div class="footer">
                        <slot name="footer">
                            <Button variant="secondary" @click="emit('update:isOpen', false)"> {{ closeText }}</Button>
                        </slot>
                    </div>
                </div>
            </div>

        </teleport>
    </transition>
</template>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    max-width: 600px;
    margin: 0 auto;
    width: min(600px, 90%);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #eee;

    h3 {
        margin: 0;
        font-size: 1.25rem;
        color: #333;
    }
}

.body {
    padding: 24px;
    max-height: 70vh;
    overflow-y: auto;
}

.footer {
    padding: 16px 24px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 8px;
    color: #666;

    &:hover {
        color: #333;
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease, transform .3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    transform: scale(0.8);
    opacity: 0;
}
</style>