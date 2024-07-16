import {DirectionType, WeatherData, WeatherType} from "../data/Interface";

export function isNumeric(str: string) {
    return /[0-9]+/.test(str);
}

export async function getHour3Data(code: string): Promise<string[]> {
    const s = await (await fetch(`http://www.weather.com.cn/weather1d/${code}.shtml`)).text();
    for (const v of s.split('\n')) {
        if (v.includes('var hour3data=')) {
            const vt = JSON.parse(v.replace('var hour3data=', ''));
            let d = ((vt['1d'])) as string[]
            let d7 = ((vt['7d'])) as string[][]
            const d23 = ((vt['23d'])) as string[][]
            d7 = d7.concat(d23)
            for (const u of d7) {
                d = d.concat(u)
            }
            return d;
        }
    }
    return []
}

const translateWeather: [string, WeatherType][] = [['晴', 'sun'], ['云', 'cloud'], ['阴', 'cloud'], ['雨', 'rain'], ['雪', 'snow'], ['雾', 'fog'], ['霾', 'fog']]
const translateWind: [string, DirectionType][] = [['北风', 'N'], ['东北风', 'NE'], ['东风', 'E'], ['东南风', 'SE'], ['南风', 'S'], ['西南风', 'SW'], ['西风', 'W'], ['西北风', 'NW']]

export async function analyseHour3Data(data: string[]): Promise<WeatherData[]> {
    const weathers = [] as WeatherData[]
    for (const d of data) {
        const s = d.split(',')
        const weather = {
            type: 'sun',
            wind: { direction: 'N', strength: 0 },
            temperature: NaN,
            day: NaN,
            hour: NaN,
            precipitation: NaN
        } as WeatherData
        for (const v of translateWeather) {
            if (s[2].includes(v[0])) {
                weather.type = v[1]
                break;
            }
        }
        for (const v of translateWind) {
            if (s[4] == v[0]) {
                weather.wind.direction = v[1]
                break;
            }
        }
        for (const v of s[5].split('')) {
            if (isNumeric(v)) {
                weather.wind.strength = parseFloat(v[0])
                break;
            }
        }
        const t = s[0].replace('日', ';').replace('时', '').split(';')
        weather.day = parseInt(t[0])
        weather.hour = parseInt(t[1])
        weather.temperature = parseFloat(s[3])
        weather.precipitation = parseFloat(s[6])
        weathers.push(weather)
    }
    weathers.sort((a, b) => {
        const now = new Date();
        const da = new Date(now.getFullYear(), now.getMonth(), a.day, a.hour, 0, 0);
        const db = new Date(now.getFullYear(), now.getMonth(), b.day, b.hour, 0, 0);
        return da.getTime() - db.getTime();
    })
    return uniqBy(weathers, JSON.stringify);
}

function uniqBy(a: Array<any>, key: any) {
    let seen = new Set();
    return a.filter(item => {
        let k = key(item);
        return seen.has(k) ? false : seen.add(k);
    });
}