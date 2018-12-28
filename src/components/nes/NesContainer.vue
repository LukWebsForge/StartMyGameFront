<template>
    <section class="nes-container with-title">
        <h2 class="title">{{ title }}</h2>
        <div>
            <slot></slot>
        </div>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class NesContainer extends Vue {
        @Prop() private title!: string;
    }
</script>

<style scoped>

</style>
