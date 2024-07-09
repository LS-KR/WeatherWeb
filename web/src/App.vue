<template>
    <div class="top">
        <v-text-field label="City" variant="outlined" v-model="model" @keydown="search"></v-text-field>
    </div>
    <div class="content">
        <CityCard v-for="v of cities" :key="v" :name="v" />
    </div>
</template>

<script lang="ts">
import CityCard from "@/components/CityCard.vue";
import CityWeather from "@/components/CityWeather.vue";
import {backendurl} from "@/logic/config";
import {Code} from "@/logic/data";
import urlJoin from "url-join";
import {Component, Vue} from "vue-facing-decorator";

@Component({
    components: { CityCard, CityWeather }
})
export default class App extends Vue {
    model = ''
    cities = [] as string[]

    search(e: KeyboardEvent) {
        console.log(this.model)
        if (e.key == 'Enter') {
            fetch(urlJoin(backendurl, 'search', this.model))
                .then(it => it.json())
                .then(it => {
                    this.cities = []
                    for (const city of (it as Code[])) {
                        this.cities.push(city.city)
                    }
                })
        }
    }
}
</script>

<style lang="scss">
@import '@/style/latte';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    max-width: 1040px;
    background-color: $base;
    margin: 0 auto;
    min-height: 100vh;
}

.top {
    padding: 40px 40px 0;
}

.content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-items: start;
    align-content: flex-start;
    flex-wrap: wrap;
    gap: 20px;
    padding: 40px
}
</style>