mapboxgl.accessToken = 'pk.eyJ1Ijoic2FzaGEtaGF2aWEiLCJhIjoiY2pkdGN3MW1hMHpzNDJ4bnk4NzBnOXVzeSJ9.9a0w0WPYRY4qJC0dDSUnKg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-68.13734351262877, 45.137451890638886],
    zoom: 5
});


//changing views on extent change
const zoomThreshold = 9.5;
const infobox = document.querySelector('.info');
const layers = {
    "overview": ["nws-watchwarn-tiles", "radar-tiles"],
    "local": ["points", "areas"]
}
map.on('moveend', function () {

    console.log(map.getZoom());

    //change layers view
    if (map.getZoom() > zoomThreshold) {
        infobox.classList.add('hidden');
    } else {
        infobox.classList.remove('hidden');
        
    }

    //change details view
    if (map.getZoom() >= zoomThreshold - 1.5) {
        getWatchWarnInBound(map.getBounds()).then(features => {
            console.log(features);
            if (features.length) {
                infobox.innerHTML = '<h3>current Watch/Warnings in view</h3>' + features.map(feature => {
                    const attr = feature.attributes;
                    return `<p>${attr.phenom}-${attr.prod_type}\n<a href="${attr.url}" target="_blank">${attr.warnid.trim()}</a></p>`
                }).join('');
            } else {
                infobox.innerHTML = '<p>no Watch/Warnings in view</p>';
            }
        });
    } else {
        infobox.innerHTML = '<p>zoom in for more details</p>';
    }
})

const layersMenu = document.getElementById('layersMenu');
function generateMenuLink(id) {
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    layersMenu.appendChild(link);
}

//init layersMenu
layers.local.map(id => generateMenuLink(id));
layers.overview.map(id => generateMenuLink(id));

//Promise returns latlng array of first result
function getWatchWarnInBound(bound) {
    return new Promise((resolve, reject) => {
        return fetch(`https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/1/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=0&geometry={"xmin":${bound._ne.lng},"ymin":${bound._ne.lat},"xmax":${bound._sw.lng},"ymax":${bound._sw.lat},"spatialReference":{"wkid":4326}&geometryType=esriGeometryEnvelope&inSR=4326&outFields=*&outSR=4326`)
            .then(res => res.json())
            .then(data => {
                resolve(data.features);
            })
    });
}


map.on('load', function () {

    //add radar layer from aerisweather
    map.addLayer({
        "id": "radar-tiles",
        "type": "raster",
        "source": "aerisweather-radar",
        "minzoom": 0,
        "maxzoom": zoomThreshold,
        "source": {
            "type": 'raster',
            "tiles": [
                'https://maps1.aerisapi.com/H2dWFu3nW0pw7PMQjR9vD_SEtTj2ZUnANcEedAQ1m9k7jaFD8T11ZMaCPjptBL/radar/{z}/{x}/{y}/current.png',
                'https://maps2.aerisapi.com/H2dWFu3nW0pw7PMQjR9vD_SEtTj2ZUnANcEedAQ1m9k7jaFD8T11ZMaCPjptBL/radar/{z}/{x}/{y}/current.png',
                'https://maps3.aerisapi.com/H2dWFu3nW0pw7PMQjR9vD_SEtTj2ZUnANcEedAQ1m9k7jaFD8T11ZMaCPjptBL/radar/{z}/{x}/{y}/current.png',
                'https://maps4.aerisapi.com/H2dWFu3nW0pw7PMQjR9vD_SEtTj2ZUnANcEedAQ1m9k7jaFD8T11ZMaCPjptBL/radar/{z}/{x}/{y}/current.png'
            ],
            "tileSize": 256,
            "attribution": "<a href='https://www.aerisweather.com/'>AerisWeather</a>"
        }
    });

    //added watch/warn layer from NWS
    map.addLayer({
        "id": "nws-watchwarn-tiles",
        "type": "raster",
        "minzoom": 0,
        "maxzoom": zoomThreshold,
        "source": {
            "type": "raster",
            "tiles": ['https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/export?dpi=35&transparent=true&format=png32&layers=show:0,1&bbox={bbox-epsg-3857}&bboxSR=3857&imageSR=3857&size=1024,1024&f=image'],
            "tileSize": 1024,
            "attribution": "Sources: Esri, USGS, NOAA"
        },
        "paint": {
            "raster-opacity": 0.3
        }
    });

    //add dummy user data
    map.addLayer({
        "id": "points",
        "type": "symbol",
        "minzoom": zoomThreshold,
        "maxzoom": 22,
        "source": {
            "type": "geojson",
            "data": DUMMY_POINTS,
        },
        "layout": {
            "icon-image": "{icon}-15"
        }
    })

    map.addLayer({
        "id": "areas",
        "type": "fill",
        "minzoom": zoomThreshold,
        "maxzoom": 22,
        "source": {
            "type": "geojson",
            "data": DUMMY_AREA,
        },
        "paint": {
            "fill-color": "#880000",
            "fill-opacity": 0.4
        },
    })

});