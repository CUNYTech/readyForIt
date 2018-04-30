import { fromJS } from 'immutable';
import { zoomThreshold } from './DefaultMapStyle';

export const RadarTilesSource = fromJS({
    type: 'raster',
    tiles: [
        'https://maps1.aerisapi.com/ehTVO15rAb9YMKPGddsHK_txZPf4edBJ3WV4496pAc27GSVMmJRrsDgajMUA1n/radar/{z}/{x}/{y}/current.png',
        'https://maps1.aerisapi.com/ehTVO15rAb9YMKPGddsHK_txZPf4edBJ3WV4496pAc27GSVMmJRrsDgajMUA1n/radar/{z}/{x}/{y}/current.png',
        'https://maps1.aerisapi.com/ehTVO15rAb9YMKPGddsHK_txZPf4edBJ3WV4496pAc27GSVMmJRrsDgajMUA1n/radar/{z}/{x}/{y}/current.png',
        'https://maps1.aerisapi.com/ehTVO15rAb9YMKPGddsHK_txZPf4edBJ3WV4496pAc27GSVMmJRrsDgajMUA1n/radar/{z}/{x}/{y}/current.png'
    ],
    tileSize: 256,
    attribution: "<a href='https://www.aerisweather.com/'>AerisWeather</a>"
})

export const RadarTilesLayer = fromJS({
    id: "radar-tiles",
    type: "raster",
    source: "RadarTilesSource",
    minzoom: 0,
    maxzoom: zoomThreshold,
    interactive: true,
    toggle: true,
    paint: {
        "raster-opacity": 0.5
    }
});


// 'https://maps2.aerisapi.com/H2dWFu3nW0pw7PMQjR9vD_SEtTj2ZUnANcEedAQ1m9k7jaFD8T11ZMaCPjptBL/radar/{z}/{x}/{y}/current.png',

