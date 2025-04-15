<script setup lang="ts">
</script>

<template>
    <button class="resizer">
        <div></div>
        <div></div>
        <div></div>
    </button>
</template>

<style lang="scss" scoped>
.resizer {
    width: 10px;
    cursor: col-resize;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding-top: 5px;

    border: none;
    background-color: transparent;
    div {
        height: 2px;
        width: 10px;
        background-color: gray;
    }
}
</style>