import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
// import { fromJS } from 'immutable';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../css/Map.css';

import LayersMenu from './LayersMenu';
import Tray from './Tray';
import SideBar from './SideBar';
import LocationSearch from './LocationSearch';

import {getGeoLocation} from '../helpers/geolocation';

//set up sources and styles for layers
import DefaultMapStyle  from '../layers/DefaultMapStyle';
import { WatchWarnTilesSource, WatchWarnTilesLayer} from '../layers/WatchWarnTiles';
import { RadarTilesSource, RadarTilesLayer } from '../layers/RadarTiles';



const layers = [WatchWarnTilesLayer, RadarTilesLayer].reduce((p,c) => {
    return p.insert(p.size, c);
},DefaultMapStyle.get('layers'));

const mapStyle = DefaultMapStyle
    .setIn(['sources', 'WatchWarnTilesSource'], WatchWarnTilesSource)
    .setIn(['sources', 'RadarTilesSource'], RadarTilesSource)
    .set('layers', layers);

const MAPBOX_TOKEN = "pk.eyJ1Ijoic2FzaGEtaGF2aWEiLCJhIjoiY2pkdGN3MW1hMHpzNDJ4bnk4NzBnOXVzeSJ9.9a0w0WPYRY4qJC0dDSUnKg";

class Map extends Component {
    state = {
        mapStyle,
        //set all layers with toggle to true
        layers: mapStyle.get('layers').filter(layer => layer.get('toggle'))
            .map(layer => layer.get('id'))
            .reduce((p,c) => {
                p[c] = true;
                return p;
            },{}),
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: 40.7128,
            longitude: -74.0060,
            zoom: 7
        },
        watchwarn : [],
        bounds: []
    };

    componentDidMount() {
        window.addEventListener('resize', this._resize);
        this._resize();
        //zoom to user location
        getGeoLocation()
            .then(latLng => this.zoomToLocation(latLng))
            .catch(error=> console.error(error));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize);
    }

    zoomToLocation = (latLng,zoom = 12) => {
        //latLng is an object with lat and lng
        const viewport = this.state.viewport;
        viewport.latitude = latLng.lat;
        viewport.longitude = latLng.lng;
        viewport.zoom = zoom;
        this.setState({viewport});
    }

    //window resize
    _resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: this.props.width || window.innerWidth,
                height: this.props.height || window.innerHeight
            }
        });
    };

    _onViewportChange = viewport => {
        //this.getWatchWarnInBound(viewport);
        this.setState({viewport});
        const bound = this.mapRef.getMap().getBounds();
        const bounds = [bound._ne.lng, bound._ne.lat, bound._sw.lng, bound._sw.lat, this.state.viewport.zoom];

        this.setState({bounds});
    };


    //layers menu toggle
    updateVisibility = () => {
        let mapStyle = this.state.mapStyle;
        Object.keys(this.state.layers).map(id => {
            const visibility = this.state.layers[id];
            //get index of layer
            const layerIndex = mapStyle.get('layers').findIndex(layer => layer.get('id') === id);
            //update layout
            visibility ? mapStyle = mapStyle.setIn(['layers',layerIndex,'layout','visibility'], 'visible') : mapStyle = mapStyle.setIn(['layers',layerIndex,'layout','visibility'], 'none');
            return null
        })

        this.setState({ mapStyle });
    }

    _onLayerMenuClick = id => {
        //toggle layers visibility
        const layers = this.state.layers;
        layers[id] = !layers[id];
        this.setState({layers}, () => this.updateVisibility())
    }

    render(){
        return(
        <React.Fragment>
            <LocationSearch zoomToLocation={this.zoomToLocation}/>
            <SideBar/>
            <ReactMapGL
                ref={ map => this.mapRef = map }
                {...this.state.viewport}
                mapStyle={this.state.mapStyle}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onViewportChange={this._onViewportChange}
            />
            
            <LayersMenu 
                layers={this.state.layers}
                onLayerMenuClick={this._onLayerMenuClick}
            />
            <Tray bounds={this.state.bounds} viewport={this.state.viewport}/>
        </React.Fragment>
        )
    }

}

export default Map;