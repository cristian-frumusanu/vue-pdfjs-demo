<template>
    <div class="viewer" v-loading="isLoading">
        <nav
            class="navbar text-white bg-primary viewer__navbar justify-content-center py-3"
        >
            <h1 class="viewer__title h6 mb-0">
                PDF Viewer
            </h1>
        </nav>
        <section v-if="pdfURL" class="viewer__body">
            <main class="viewer__main">
                <PDFViewer :url="pdfURL" />
            </main>
        </section>
    </div>
</template>

<script lang="ts" src="./DocumentViewer.ts"></script>

<style lang="scss" src="./DocumentViewer.scss"></style>
