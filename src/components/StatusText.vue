<template>
    <span>
        Status: <span v-bind:class="statusColor">{{ statusTranslation }}</span>
    </span>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { ServerStatus } from '@/api/constants';

    @Component
    export default class StatusText extends Vue {

        @Prop() private status!: string;
        @Prop() private progress!: number;
        @Prop() private progressMax!: number;

        get statusColor(): object {
            return {
                'is-success': this.status === ServerStatus.ACTIVE,
                'is-warning': this.status === ServerStatus.STARTUP,
                'is-error': this.status === ServerStatus.STARTUP_ERROR,
            };
        }

        get statusTranslation(): string {
            switch (this.status) {
                case ServerStatus.ACTIVE:
                    return 'Aktiv';
                case ServerStatus.STARTUP:
                    return 'Startet (Schritt ' + (this.progress + 1) + ' / ' + (this.progressMax + 1) + ' )';
                case ServerStatus.STARTUP_ERROR:
                    return 'Fehler beim Start';
                case ServerStatus.OFF:
                    return 'Aus';
                default:
                    return 'Unbekannt';
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/nes.colors";
</style>

