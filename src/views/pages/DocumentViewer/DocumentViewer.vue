<template>
    <div class="viewer" v-loading="isLoading">
        <section v-if="pdfURL" class="viewer__body">
            <main class="viewer__main">
                <PDFViewer :url="pdfURL" />
            </main>
        </section>
    </div>
</template>

<script lang="ts" src="./DocumentViewer.ts"></script>

<style lang="scss" src="./DocumentViewer.scss"></style>
