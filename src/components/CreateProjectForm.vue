<script setup lang="ts">
import { ProjectCreateSchema, type ProjectCreate } from '@/models/project';
import { useProjectsStore } from '@/stores/projects';
import Button from '@/ui/Button.vue';
import Input from '@/ui/Input.vue';
import Modal from '@/ui/Modal.vue';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const isOpen = ref(false)
const projectFields = ref<ProjectCreate>({
    name: '',
    description: '',
})

const store = useProjectsStore();

function setIsOpen(value: boolean) {
    isOpen.value = value
}


async function createProject() {
    const validationResult = ProjectCreateSchema.safeParse(projectFields.value)
    if (!validationResult.success) {
        const errors = validationResult.error.errors.map(error => error.message).join(', ')
        toast.error(errors)
        return;
    }

    // Assuming you have a function to create a project in your store or API
    await store.createProject(projectFields.value)
    toast.success('Проект створився успішно!')
    setIsOpen(false)
}
</script>

<template>
    <Modal v-model:is-open="isOpen" title="Створення проекту" close-text="Закрити">
        <form @submit.prevent="createProject" id="create-project-form">
            <Input v-model:model-value="projectFields.name" label="Назва проекту" name="name" />
            <Input v-model:model-value="projectFields.description" label="Опис проекту" name="description" />
        </form>
        <template #footer>
            <Button variant="primary" form="create-project-form" type="submit">Створити
                проект</Button>
        </template>
    </Modal>
    <Button variant="primary" @click="setIsOpen(true)">Додати проект</Button>
</template>

<style lang="scss" scoped></style>