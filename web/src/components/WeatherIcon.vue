<script lang="ts">
import {WeatherType} from "@/logic/data";
import {Icon} from '@iconify/vue'
import {Component, Prop, Vue} from 'vue-facing-decorator';

@Component({
    components: { Icon }
})
export default class WeatherIcon extends Vue {
    @Prop({ required: true }) type: WeatherType;
}
</script>

<template>
    <Icon class="icon" icon="ph:sun" v-if="type == 'sun'"/>
    <Icon class="icon" icon="ph:cloud" v-else-if="type == 'cloud'"/>
    <Icon class="icon" icon="ph:cloud-rain" v-else-if="type == 'rain'"/>
    <Icon class="icon" icon="ph:snowflake" v-else-if="type == 'snow'"/>
    <Icon class="icon" icon="ph:cloud-fog" v-else-if="type == 'fog'"/>
</template>

<style lang="scss">
@import '@/style/latte';

.icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    color: $text
}
</style>