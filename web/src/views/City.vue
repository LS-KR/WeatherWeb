<script lang="ts">
import CityWeather from "@/components/CityWeather.vue";
import {backendurl} from "@/logic/config";
import {WeatherData} from "@/logic/data";
import urlJoin from "url-join";
import {Vue, Component, Prop} from 'vue-facing-decorator';

@Component({
    components: { CityWeather }
})
export default class City extends Vue {
    @Prop({required: true}) cityId!: string;

    weather = [] as WeatherData[]

    created() {
        fetch(urlJoin(backendurl, 'weather', this.cityId))
            .then(it => it.json())
            .then(it => this.weather = it as WeatherData[])
        localStorage.setItem('city', this.cityId);
    }
}
</script>

<template>
    <h1 v-text="cityId"></h1>
    <div class="weather-container">
        <CityWeather v-for="v of weather" :key="v" :weather="v" />
    </div>
</template>

<style lang="scss">
@import "@/style/latte";

h1 {
    text-align: start;
    border-bottom: 1px solid $text;
    margin: 0 20px;
    padding-top: 60px;
}

.weather-container {
    column-width: 300px;
    column-gap: 40px;
    padding: 20px;
}
</style>