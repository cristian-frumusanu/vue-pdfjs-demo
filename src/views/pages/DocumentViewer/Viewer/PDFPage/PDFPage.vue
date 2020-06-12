<template>
    <div class="pdf-page-container" v-bind="canvasAttrs">
        <canvas
            ref="canvas"
            class="pdf-page"
            v-visible.once="drawPage"
            v-bind="canvasAttrs"
        ></canvas>
        <canvas
            v-if="selectedSentenceFrame"
            ref="canvas-h"
            class="pdf-page--highlight"
            v-bind="canvasAttrs"
        ></canvas>
    </div>
</template>

<script lang="ts" src="./PDFPage.ts"></script>

<style lang="scss" src="./PDFPage.scss"></style>
