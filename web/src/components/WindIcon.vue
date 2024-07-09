<script lang="ts">
import {Wind} from "@/logic/data";
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {Icon} from '@iconify/vue'

@Component({components: {Icon}})
export default class WindIcon extends Vue {
    @Prop({required: true}) wind: Wind;
}
</script>

<template>
<div class="wind-icon">
    <Icon class="icon" icon="ph:arrow-down" v-if="wind.direction == 'N'" />
    <Icon class="icon" icon="ph:arrow-down-left" v-if="wind.direction == 'NE'" />
    <Icon class="icon" icon="ph:arrow-left" v-if="wind.direction == 'E'" />
    <Icon class="icon" icon="ph:arrow-up-left" v-if="wind.direction == 'SE'" />
    <Icon class="icon" icon="ph:arrow-up" v-if="wind.direction == 'S'" />
    <Icon class="icon" icon="ph:arrow-up-right" v-if="wind.direction == 'SW'" />
    <Icon class="icon" icon="ph:arrow-right" v-if="wind.direction == 'W'" />
    <Icon class="icon" icon="ph:arrow-down-right" v-if="wind.direction == 'NW'" />
    <p class="strength" v-text="wind.strength + 'ss'"></p>
</div>
</template>

<style lang="scss">
@import "@/style/latte";

.wind-icon {
    height: 24px;
    width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    gap: 4px;
    color: $text;

    .icon {
        width: 24px;
        height: 24px;
    }

    .strength {
        font-size: 12px;
    }
}
</style>