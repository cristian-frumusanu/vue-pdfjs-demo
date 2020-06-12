<template>
    <ScrollingDocument
        class="pdf-document"
        v-bind="{ pages, pageCount, currentPage }"
        v-slot="{ page, isPageFocused, isElementFocused }"
        :enable-page-jump="true"
        @page-jump="onPageJump"
        @pages-fetch="onPagesFetch"
        @pages-reset="fitWidth"
    >
        <PDFPage
            v-bind="{
                scale,
                optimalScale,
                page,
                isPageFocused,
                isElementFocused,
            }"
            @page-rendered="onPageRendered"
            @page-errored="onPageErrored"
            @page-focus="onPageFocused"
        />
    </ScrollingDocument>
</template>

<script lang="ts" src="./PDFDocument.ts"></script>

<style lang="scss" src="./PDFDocument.scss"></style>
