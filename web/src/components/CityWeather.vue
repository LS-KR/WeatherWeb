<script lang="ts">
import WeatherIcon from "@/components/WeatherIcon.vue";
import WindIcon from "@/components/WindIcon.vue";
import {WeatherData} from "@/logic/data";
import {Icon} from '@iconify/vue'
import {Component, Prop, Vue} from 'vue-facing-decorator';

@Component({ components: { WindIcon, WeatherIcon, Icon } })
export default class CityWeather extends Vue {
    @Prop({ required: true }) weather: WeatherData;
}
</script>

<template>
    <div class="city-weather">
        <p class="time" v-text="weather.day + '/' + weather.hour + ':00'"/>
        <div class="weatherData">
            <WeatherIcon :type="weather.type"/>
            <p class="temp" v-text="weather.temperature + '°C'"/>
            <WindIcon :wind="weather.wind"/>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/style/latte";

.city-weather {
    display: block;
    width: 100%;
    height: fit-content;
    min-height: 24px;
    padding: 8px 8px;

    .time {
        text-align: left;
        color: $subtext0;
        font-size: 12px;
        margin-top: 8px;
    }

    .weatherData {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        justify-items: start;
        align-content: start;

        .temp {
            font-size: 24px;
            color: $text;
        }
    }
}
</style>