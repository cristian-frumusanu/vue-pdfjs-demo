<template>
    <div>
        <slot name="preview" :pages="pages"></slot>
        <slot name="document" :pages="pages"></slot>
    </div>
</template>

<script src="./PDFData.ts" lang="ts"></script>
