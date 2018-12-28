<template>
    <div>
        <h1>
            <i class="snes-jp-logo"></i> StartMyGame
        </h1>
        <br>
        <NesContainer title="TTT Server">
            <StatusDiv></StatusDiv>
        </NesContainer>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import NesContainer from './nes/NesContainer.vue';
    import StatusDiv from './StatusDiv.vue';

    @Component({
        components: {
            NesContainer,
            StatusDiv,
        },
    })
    export default class MainPage extends Vue {

    }
</script>

<style scoped>

</style>
