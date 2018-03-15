import { fromJS } from 'immutable';
import { zoomThreshold } from './DefaultMapStyle';

export const RadarTilesSource = fromJS({
    type: 'raster',
    tiles: [
        'https://maps1.aerisapi.com/H2dWFu3nW0pw7PMQjR9vD_SEtTj2ZUnANcEedAQ1m9k7jaFD8T11ZMaCPjptBL/radar/{z}/{x}/{y}/current.png',
        'https://maps2.aerisapi.com/H2dWFu3nW0pw7PMQjR9vD_SEtTj2ZUnANcEedAQ1m9k7jaFD8T11ZMaCPjptBL/radar/{z}/{x}/{y}/current.png',
        'https://maps3.aerisapi.com/H2dWFu3nW0pw7PMQjR9vD_SEtTj2ZUnANcEedAQ1m9k7jaFD8T11ZMaCPjptBL/radar/{z}/{x}/{y}/current.png',
        'https://maps4.aerisapi.com/H2dWFu3nW0pw7PMQjR9vD_SEtTj2ZUnANcEedAQ1m9k7jaFD8T11ZMaCPjptBL/radar/{z}/{x}/{y}/current.png'
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
    toggle: true
});

