<script lang="ts">
import CityWeather from "@/components/CityWeather.vue";
import {backendurl} from "@/logic/config";
import {WeatherData} from "@/logic/data";
import {Icon} from "@iconify/vue";
import urlJoin from "url-join";
import {Component, Prop, Vue} from 'vue-facing-decorator';

@Component({
    components: { CityWeather, Icon }
})
export default class CityCard extends Vue {
    @Prop({ required: true }) name!: string;

    weather = [] as WeatherData[]
    isStared = false

    created() {
        fetch(urlJoin(backendurl, 'weather', this.name))
            .then(it => it.json())
            .then(it => this.weather = (it as WeatherData[]).slice(0, 6))
        if (localStorage.getItem('star')) {
            if ((JSON.parse(localStorage.getItem('star')) as string[]).includes(this.name)) {
                this.isStared = true;
            }
        } else {
            localStorage.setItem('star', '[]')
        }
    }

    star() {
        if (this.isStared) {
            this.isStared = false;
            const list = [] as string[]
            for (const v of (JSON.parse(localStorage.getItem('star')) as string[])) {
                if (v == this.name) continue;
                list.push(v)
            }
            localStorage.setItem('star', JSON.stringify(list))
        } else {
            this.isStared = true;
            localStorage.setItem('star', JSON.stringify((JSON.parse(localStorage.getItem('star')) as string[]).concat([this.name])))
        }
    }
}
</script>

<template>
    <div class="city-card">
        <h1>
            <a v-text="name" v-bind:href="'/city/' + name"/>
            <Icon class="star" icon="ph:star" v-if="!isStared" v-on:click="star()"/>
            <Icon class="star" icon="ph:star-duotone" v-else v-on:click="star()"/>
        </h1>
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

    h1 {
        border-bottom: 1px solid $subtext1;
        color: $text;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        justify-items: legacy;
        font-size: 1.5rem;

        a {
            color: $text;
            text-decoration: none;

            &:active {
                color: $text;
            }
        }

        .star {
            color: $yellow;
            cursor: pointer;
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.5rem;
            padding-bottom: 0.12rem;
        }
    }
}
</style>