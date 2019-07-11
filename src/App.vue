<template>
    <div id="app">
        <MainPage></MainPage>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import MainPage from './components/MainPage.vue';

    @Component({
        components: {
            MainPage,
        },
    })
    export default class App extends Vue {
    }
</script>

<style>
    @import url('~nes.css/css/nes.min.css');

    html, body, pre, code, kdb, smap {
        font-family: 'Press Start 2P', cursive;
        -webkit-font-smoothing: none;
        font-smooth: never;
    }

    body {
        padding: 0 3rem;
        margin: 3rem;
    }
</style>
