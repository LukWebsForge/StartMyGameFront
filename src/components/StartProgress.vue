<template>
    <NesProgress v-bind:type="statusColor" v-bind:value="progress" v-bind:max="progressMax">
    </NesProgress>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import NesProgress from './nes/NesProgress.vue';
    import { ServerStatus } from '@/api/constants';

    @Component({
        components: {
            NesProgress,
        },
    })
    export default class StartProgress extends Vue {

        @Prop() private status!: string;
        @Prop() private progress!: number;
        @Prop() private progressMax!: number;

        private get statusColor(): string {
            if (this.status === ServerStatus.STARTUP_ERROR) {
                return 'error';
            } else {
                return '';
            }
        }
    }
</script>

<style scoped>

</style>

