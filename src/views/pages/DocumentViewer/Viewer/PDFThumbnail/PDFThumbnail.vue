<template>
    <div
        @click="focusPage"
        v-visible.once="drawPage"
        :class="{ focused: isPageFocused }"
        class="pdf-thumbnail"
    >
        <img v-if="src" :src="src" class="box-shadow" />
        <div v-else class="placeholder box-shadow">
            <div class="content">Loading</div>
        </div>
        <span class="page-number">{{ pageNumber }}</span>
    </div>
</template>

<script src="./PDFThumbnail.ts"></script>

<style lang="scss" src="./PDFThumbnail.scss"></style>
