<template>
    <div class="pdf-paginator  text-muted  fs-14">
        <span class="px-1  font-weight-bold  text-black">{{ value }}</span
        >/<span class="px-1">{{ pageCount }}</span>
    </div>
</template>

<script lang="ts" src="./PDFPaginator.ts"></script>

<style>
.pdf-paginator {
    padding: 0.25rem 1rem;
    background-color: var(--color-gray-4);
    border-radius: 3rem;
}
</style>
