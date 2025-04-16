<script setup lang="ts">
import { ProjectCreateSchema, TaskCreateSchema, type ProjectCreate, type TaskCreate, type TaskStatus } from '@/models/project';
import { useTasksStore } from '@/stores/tasks';
import Button from '@/ui/Button.vue';
import Input from '@/ui/Input.vue';
import Modal from '@/ui/Modal.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const props = defineProps<{
  projectId: number,
  order: number,
  status: TaskStatus
}>()

const isOpen = ref(false)
const taskFields = ref<Omit<TaskCreate, 'projectId'>>({
  name: '',
  assigneeName: '',
  order: 0,
  completeTo: '',
  status: props.status
})

const store = useTasksStore()

function setIsOpen(value: boolean) {
  isOpen.value = value
}

async function createProject() {
  const validationResult = TaskCreateSchema.safeParse({
    ...taskFields.value,
    projectId: props.projectId,
    order: props.order
  })
  if (!validationResult.success) {
    const errors = validationResult.error.errors.map(error => error.message).join(', ')
    toast.error(errors)
    return;
  }

  await store.createTask({
    ...taskFields.value,
    projectId: props.projectId,
    order: props.order
  } as TaskCreate)
  toast.success('Завдання створилось успішно!')
  setIsOpen(false)
}
</script>

<template>
  <Modal v-model:is-open="isOpen" title="Створення проекту" close-text="Закрити">
    <form @submit.prevent="createProject" id="create-project-form">
      <Input v-model:model-value="taskFields.name" label="Назва завдання" name="name" />
      <Input v-model:model-value="taskFields.assigneeName" label="Виконавець" name="assigneeName" />
      <Input v-model:model-value="taskFields.completeTo" type="date" label="Виконавець" name="assigneeName" />
    </form>
    <template #footer>
      <Button variant="primary" form="create-project-form" type="submit">Створити
        проект</Button>
    </template>
  </Modal>
  <Button v-bind="$attrs" variant="primary" @click="setIsOpen(true)">Додати проект</Button>
</template>

<style lang="scss" scoped></style>