<template>
    <div class="pdf-viewer" :class="{ 'is--preview-shown': isPreviewEnabled }">
        <header class="pdf-viewer__header text-center">
            <h1 class="h6 mb-0">Vue.js PDF viewer</h1>

            <div class="pdf-viewer__controls">
                <PDFPaginator
                    v-model="currentPage"
                    :pageCount="pageCount"
                    @prev-page="prevPage"
                    @next-page="nextPage"
                />
                <PDFZoom
                    class="ml-auto"
                    :scale="scale"
                    @change="updateScale"
                    @fit="updateFit"
                />
            </div>
        </header>

        <PDFData
            class="pdf-viewer__main"
            :url="url"
            @page-count="updatePageCount"
            @page-focus="updateCurrentPage"
            @document-errored="onDocumentErrored"
            @document-rendered="onDocumentRendered"
        >
            <template v-slot:preview="{ pages }">
                <button
                    @click="isPreviewEnabled = !isPreviewEnabled"
                    class="pdf-preview__trigger"
                >
                    <font-awesome-icon icon="caret-right" />
                </button>
                <PDFPreview
                    class="pdf-viewer__preview"
                    v-bind="{
                        pages,
                        scale,
                        currentPage,
                        pageCount,
                        isPreviewEnabled,
                    }"
                />
            </template>

            <template v-slot:document="{ pages }">
                <PDFDocument
                    class="pdf-viewer__document"
                    :class="{ 'preview-enabled': isPreviewEnabled }"
                    v-bind="{
                        pages,
                        scale,
                        optimalScale,
                        fit,
                        currentPage,
                        pageCount,
                        isPreviewEnabled,
                    }"
                    @scale-change="updateScale"
                />
            </template>
        </PDFData>
    </div>
</template>

<script lang="ts" src="./PDFViewer.ts"></script>

<style lang="scss" src="./PDFViewer.scss"></style>
