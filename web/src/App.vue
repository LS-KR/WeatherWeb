<template>
    <router-view id="router" />
</template>

<script lang="ts">
import {Component, Vue} from "vue-facing-decorator";
import router from "@/router";

@Component({})
export default class App extends Vue {

}
</script>

<style lang="scss">
@import '@/style/latte';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    max-width: 1040px;
    background-color: $base;
    margin: 0 auto;
    min-height: 100vh;
}
</style>