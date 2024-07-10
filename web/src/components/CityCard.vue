<script lang="ts">
import CityWeather from "@/components/CityWeather.vue";
import {backendurl} from "@/logic/config";
import {WeatherData} from "@/logic/data";
import urlJoin from "url-join";
import {Component, Prop, Vue} from 'vue-facing-decorator';

@Component({
    components: { CityWeather }
})
export default class CityCard extends Vue {
    @Prop({ required: true }) name!: string;

    weather = [] as WeatherData[]

    created() {
        fetch(urlJoin(backendurl, 'weather', this.name))
            .then(it => it.json())
            .then(it => this.weather = (it as WeatherData[]).slice(0, 6))
    }
}
</script>

<template>
    <div class="city-card">
        <a class="name" v-text="name" v-bind:href="'/city/' + name"/>
        <CityWeather v-for="v in weather" :key="v" :weather="v"/>
    </div>
</template>

<style scoped lang="scss">
@import "@/style/latte";

.city-card {
    width: 300px;
    display: block;
    color: $text;
    padding: 8px;
    border: 1px solid $rosewater;
    border-radius: 16px;

    a {
        border-bottom: 1px solid $subtext1;
        text-decoration: none;
        color: $text;
        font-size: x-large;
        font-weight: 800;
        width: 100%;
        display: block;

        &:active {
            color: $text;
        }
    }
}
</style>