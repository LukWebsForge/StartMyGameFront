<template>
    <button v-bind:class="cssClass" class="nes-btn" v-on:click="handleClick" v-bind:disabled="disabled">
        <slot></slot>
    </button>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class NesButton extends Vue {
        @Prop() private type!: string;
        @Prop() private disabled!: boolean;

        private handleClick(): void {
            if (!this.disabled) {
                this.$emit('click');
            }
        }

        private get cssClass(): string {
            let classes = '';
            if (this.disabled) {
                classes += 'is-disabled ';
            }
            if (this.type && this.type !== '') {
                classes += 'is-' + this.type;
            }
            return classes;
        }
    }
</script>

<style scoped>

</style>
