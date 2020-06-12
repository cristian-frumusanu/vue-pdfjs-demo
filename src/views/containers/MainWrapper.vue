<template>
    <div class="wrapper  wrapper--main">
        <router-view :key="$route.fullPath" />
    </div>
    <!-- .wrapper -->
</template>

<script lang="ts" src="./MainWrapper.ts"></script>

<style lang="scss" src="./MainWrapper.scss"></style>
