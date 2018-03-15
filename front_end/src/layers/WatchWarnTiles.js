import { fromJS } from 'immutable';
import { zoomThreshold } from './DefaultMapStyle';

export const WatchWarnTilesSource = fromJS({
    type: "raster",
    tiles: ['https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/export?dpi=35&transparent=true&format=png32&layers=show:0,1&bbox={bbox-epsg-3857}&bboxSR=3857&imageSR=3857&size=1024,1024&f=image'],
    tileSize: 1024,
    attribution: "Sources: Esri, USGS, NOAA"
})

export const WatchWarnTilesLayer = fromJS({
    id: "nws-watchwarn-tiles",
    type: "raster",
    minzoom: 0,
    maxzoom: zoomThreshold,
    source: "WatchWarnTilesSource",
    paint: {
        "raster-opacity": 0.3
    },
    interactive: true,
    toggle: true
});


