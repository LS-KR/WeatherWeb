<script lang="ts">
import CityCard from "@/components/CityCard.vue";
import {backendurl} from "@/logic/config";
import {Code} from "@/logic/data";
import urlJoin from "url-join";
import {Vue, Component} from 'vue-facing-decorator';

@Component({
    components: { CityCard }
})
export default class Home extends Vue {
    model = ''
    cities = [] as string[]

    search(e: KeyboardEvent) {
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

<template>
    <div class="top">
        <v-text-field label="City" variant="outlined" v-model="model" @keydown="search"></v-text-field>
    </div>
    <div class="content">
        <CityCard v-for="v of cities" :key="v" :name="v" />
    </div>
    <h1 class="no-content" v-if="!cities.length" >←Nothing→</h1>
</template>

<style lang="scss">
@import '@/style/latte';

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

.no-content {
    text-align: center;
    font-size: 80px;
    color: $mauve;
    opacity: 0.125;
    user-select: none;
}
</style>