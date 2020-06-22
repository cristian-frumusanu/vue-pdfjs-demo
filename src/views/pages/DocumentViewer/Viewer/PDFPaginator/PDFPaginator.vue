<template>
    <div class="pdf-paginator  text-muted  fs-14">
        <div>
            <ElButton @click="prevPage" type="text">
                <font-awesome-icon icon="arrow-alt-circle-up" size="lg" />
            </ElButton>
            <ElButton @click="nextPage" type="text">
                <font-awesome-icon icon="arrow-alt-circle-down" size="lg" />
            </ElButton>
        </div>

        <div class="pdf-paginator__counter">
            <span class="px-1  font-weight-bold  text-black">{{ value }}</span>
            /
            <span class="px-1">{{ pageCount }}</span>
        </div>
    </div>
</template>

<script lang="ts" src="./PDFPaginator.ts"></script>

<style src="./PDFPaginator.scss" lang="scss"></style>
