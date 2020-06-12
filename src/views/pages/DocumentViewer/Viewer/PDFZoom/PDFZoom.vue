<template>
    <div class="pdf-zoom  d-flex">
        <div>
            <ElButton @click="prevPage" :disabled="isDisabled" type="text">
                <font-awesome-icon icon="arrow-alt-circle-up" size="lg" />
            </ElButton>
            <ElButton @click="nextPage" :disabled="isDisabled" type="text">
                <font-awesome-icon icon="arrow-alt-circle-down" size="lg" />
            </ElButton>
        </div>

        <!-- <div class="ml-4">
            <ElButton @click="zoomIn" :disabled="isDisabled" circle>
                <font-awesome-icon icon="plus" />
            </ElButton>
            <ElButton @click="zoomOut" :disabled="isDisabled" circle>
                <font-awesome-icon icon="minus" />
            </ElButton>
        </div> -->

        <!-- <a @click.prevent.stop="fitWidth" class="icon" :disabled="isDisabled">fit</a>
        <a @click.prevent.stop="fitAuto" class="icon" :disabled="isDisabled">auto</a>-->
    </div>
</template>

<script lang="ts" src="./PDFZoom.ts"></script>
