<template>
    <div>
        <NesButton type="success" v-on:click="tryStart" v-bind:disabled="disable">{{ buttonText }}</NesButton>
        <span v-show="startError !== ''" class="is-error">! Fehler beim Starten: {{ startError }}</span>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import NesButton from './nes/NesButton.vue';
    import { ServerStatus } from '@/api/constants';
    import { SMGApi } from '@/api/api';
    import { StartStatus } from '@/api/constants';

    @Component({
        components: {
            NesButton,
        },
    })
    export default class StartButton extends Vue {
        @Prop() private status!: string;
        private api: SMGApi = new SMGApi();
        private starting: boolean = false;
        private startError: string = '';

        private tryStart(): void {
            this.starting = true;
            this.startError = '';
            this.api
                .requestStart()
                .then((status) => this.handleStatus(status))
                .catch((err) => this.startError = 'Serverfehler')
                .finally(() => this.starting = false);
        }

        private handleStatus(status: string) {
            switch (status) {
                case StartStatus.IN_STARTUP:
                case StartStatus.ALREADY_RUNNING:
                    console.log('Refreshing earlier, because of status' + status);
                case StartStatus.CREATING:
                case StartStatus.STARTING: {
                    this.$emit('server-start');
                    break;
                }
                default: {
                    this.startError = 'Unbekannter Status';
                    break;
                }
            }
        }

        private get buttonText(): string {
            if (this.status === ServerStatus.STARTUP) {
                return 'Startet...';
            } else if (this.status === ServerStatus.STARTUP_ERROR) {
                return 'Erneut Starten';
            } else {
                return 'Starten';
            }
        }

        private get disable(): boolean {
            return this.starting || this.status === ServerStatus.STARTUP;
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/nes.colors";
</style>

