<template>
    <ElScrollbar
        class="scrolling-document"
        v-scroll.immediate="updateScrollBounds"
    >
        <ScrollingPage
            v-for="page in pages"
            :key="page.pageNumber"
            v-bind="{
                page,
                clientHeight,
                scrollTop,
                focusedPage,
                enablePageJump,
            }"
            v-slot="{ isPageFocused, isElementFocused }"
            @page-jump="onPageJump"
        >
            <div class="scrolling-page">
                <slot v-bind="{ page, isPageFocused, isElementFocused }"></slot>
            </div>
        </ScrollingPage>

        <div v-visible="fetchPages" class="observer"></div>
    </ElScrollbar>
</template>

<script lang="ts" src="./ScrollingDocumentSmooth.ts"></script>

<style lang="scss" scoped>
.observer {
    height: 1px;
    margin-bottom: 10px;
}
</style>
