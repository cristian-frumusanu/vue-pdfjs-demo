<template>
    <div class="pdf-zoom d-flex align-items-center">
        <ElButton
            @click="zoomIn"
            :disabled="isDisabled"
            type="text"
            size="mini"
        >
            <font-awesome-icon icon="plus-circle" size="lg" />
        </ElButton>
        <ElButton
            @click="zoomOut"
            :disabled="isDisabled"
            type="text"
            size="mini"
        >
            <font-awesome-icon icon="minus-circle" size="lg" />
        </ElButton>

        <ElButton
            @click="fitWidth"
            :disabled="isDisabled"
            round
            size="mini"
            class="ml-4"
        >
            <font-awesome-icon icon="expand-alt" class="mr-2" />
            <span>fit</span>
        </ElButton>
        <ElButton @click="fitAuto" :disabled="isDisabled" round size="mini">
            <font-awesome-icon icon="compress-alt" class="mr-2" />
            <span>auto</span>
        </ElButton>
    </div>
</template>

<script lang="ts" src="./PDFZoom.ts"></script>
