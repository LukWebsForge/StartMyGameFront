<template>
    <progress v-bind:class="'is-' + type" class="nes-progress" v-bind:value="value" v-bind:max="max"></progress>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class NesProgress extends Vue {
        @Prop() private type!: string;
        @Prop() private value!: number;
        @Prop() private max!: number;
    }
</script>

<style scoped>

</style>
