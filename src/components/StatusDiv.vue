<template>
    <div id="server-status" v-if="status !== null">
        <p>
            <StatusText
                    v-bind:status="status.status"
                    v-bind:progress="status.progress"
                    v-bind:progress-max="status.progress_max"
            ></StatusText>
        </p>

        <p v-show="isStarting">
            <StartProgress
                    v-bind:status="status.status"
                    v-bind:progress="status.progress"
                    v-bind:progress-max="status.progress_max"
            ></StartProgress>
        </p>

        <template v-if="canShowData">
            <p>
                IP:
                <span>{{ status.ip }}</span>
            </p>
            <p>
                Name:
                <span>{{ status.name }}</span>
            </p>
            <p>
                Online:
                <span>{{ status.online_player }}</span> Spieler
            </p>
            <p class="text-small">> Wenn der Server eine Stunde lang leer ist, stoppt er automatisch</p>
        </template>

        <StartButton
                v-show="showStartButton"
                v-bind:status="status.status"
                v-on:server-start="onServerStart"
        ></StartButton>
    </div>

    <div id="server-status-error" v-else-if="lastFetchError">
        <p class="is-error">! Daten können nicht abgerufen werden</p>
    </div>

    <div id="server-status-loading" v-else>
        <p>Lädt...</p>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import StatusText from './StatusText.vue';
    import StartButton from './StartButton.vue';
    import StartProgress from './StartProgress.vue';
    import { SMGApi, StatusResponse } from '@/api/api';
    import { ServerStatus } from '@/api/constants';

    @Component({
        components: {
            StatusText,
            StartButton,
            StartProgress,
        },
    })
    export default class StatusDiv extends Vue {
        private status: StatusResponse | null = null;
        private lastFetchError: boolean = false;
        private api: SMGApi = new SMGApi();

        private created(): void {
            this.updateStatus();
            setInterval(this.updateStatus, 30 * 1000);
        }

        private updateStatus(): void {
            this.api
                .fetchStatus()
                .then((status) => this.status = status)
                .catch((err) => {
                    console.log('Couldn\'t request data: ');
                    console.log('Hint: Check your setting \'web.cors_domain\'. It should be equal to this domain.');
                    console.log(err);
                    this.lastFetchError = true;
                });
        }

        private onServerStart(): void {
            this.updateStatus();
        }

        get canShowData(): boolean {
            return this.statusIs(ServerStatus.ACTIVE);
        }

        get showStartButton(): boolean {
            return this.statusIs(
                ServerStatus.OFF,
                ServerStatus.STARTUP,
                ServerStatus.STARTUP_ERROR,
            );
        }

        get isStarting(): boolean {
            return this.statusIs(ServerStatus.STARTUP, ServerStatus.STARTUP_ERROR);
        }

        private statusIs(...status: ServerStatus[]): boolean {
            if (this.status === null) {
                return false;
            } else {
                for (const entry of status) {
                    if (entry === this.status.status) {
                        return true;
                    }
                }
                return false;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/nes.colors";

    .text-small {
        font-size: 13px;
    }
</style>
