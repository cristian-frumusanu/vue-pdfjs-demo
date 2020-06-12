<template>
    <ScrollingDocumentSmooth
        class="pdf-preview"
        @pages-fetch="onPagesFetch"
        v-bind="{ pages, pageCount, currentPage }"
        v-slot="{ page, isPageFocused }"
        :is-parent-visible="isPreviewEnabled"
    >
        <PDFThumbnail
            v-bind="{ scale, page, isPageFocused }"
            @thumbnail-rendered="onThumbnailRendered"
            @thumbnail-errored="onThumbnailErrored"
            @page-focus="onPageFocused"
        />
    </ScrollingDocumentSmooth>
</template>

<script lang="ts" src="./PDFPreview.ts"></script>

<style scoped lang="scss">
.scrolling-page {
    margin-bottom: 1em;
}
</style>
