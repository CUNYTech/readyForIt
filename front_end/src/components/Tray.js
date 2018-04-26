import React, { Component } from 'react';
import debounce from '../helpers/debounce';

const COLORS = {
    'GL' : '#b2c2de',
    'WS' : '#e8bcd1',
}


class Tray extends Component {
    state = {
        toggle: false,
        watchwarn: [],
        bounds: [],
        tweets: []
    }

    _handleTrayToggle = (e) => {
        const toggle = !this.state.toggle;
        this.setState({toggle});
    }
    

    componentWillUpdate() {
        if(JSON.stringify(this.props.bounds) !== JSON.stringify(this.state.bounds)){
            const zoom = this.props.bounds[4];
            if(zoom >= 8){ //zoom level
                this.setState({bounds: this.props.bounds}, () => {
                    this.getWatchWarnInBound();
                    this.getTweets();
                });
            }
        }
    }

    //get all watches and warnings in viewport
    getWatchWarnInBound = debounce(() => {
        const bounds = this.state.bounds;
        if(bounds){
            fetch(`https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/1/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=0&geometry={"xmin":${bounds[0]},"ymin":${bounds[1]},"xmax":${bounds[2]},"ymax":${bounds[3]},"spatialReference":{"wkid":4326}&geometryType=esriGeometryEnvelope&inSR=4326&outFields=*&outSR=4326`)
                .then(res => res.json())
                .then(data => {
                    const watchwarn = data.features;
                    this.setState({watchwarn});
            });
        }
    },2000);

    //get recent tweets related to storm
    getTweets = debounce(() => {
        const bounds = this.state.bounds;
        if(bounds){
            const points = `${bounds[2]},${bounds[3]},${bounds[0]},${bounds[1]}`; //format points
            const terms = 'weather,storm';
            fetch(`/api/twitter/${points}/${terms}`)
                .then(res => res.json())
                .then(data => {
                    const tweets = data.data;
                    this.setState({tweets});
            });
        }
    },4000)

    render(){
        //get unique phenom
        const filteredWatchWarn = this.state.watchwarn.reduce((p,c)=>{
            if(p.every(i => i.attributes.phenom !== c.attributes.phenom)){
                p = [...p, c];
            } 
            return p;
        },[])

        const watchWarnCards = filteredWatchWarn.map(i => {
            const { phenom, prod_type, wfo, url, warnid } = i.attributes;
            const style = {background: COLORS[phenom]}
            return(
                <div style={style} key={warnid}>
                    <p>{phenom} - {prod_type} {wfo}</p>
                    <p><a target='_blank' href={url}>{warnid}</a></p>
                </div>
            )
        });

        const tweetCards = this.state.tweets.map(tweet=> {
            const url = tweet.entities.urls[0] ? tweet.entities.urls[0].url : null;
            return(
                <div key={tweet.id}>
                    <p>{tweet.text}</p>
                    <p><a target='_blank' href={url}>link to tweet</a></p>
                </div>
            )
        })

        const zoom = this.props.bounds[4];
        //hide tray, zoom is too out
        const zoomThreshold = zoom >= 8;

        //const Weather = zoomThreshold ? <CurrentWeather lat={(this.props.viewport.latitude).toString()} lng={(this.props.viewport.longitude).toString()}/> : null;
        return(
            <div className={`tray ${zoomThreshold ? '' : 'hidden'}`}>
                <div className='trayHeader'>
                    {/* <div onClick={this._handleTrayToggle}>toggle</div> */}
                    <button className='button' onClick={this._handleTrayToggle}>{zoomThreshold ? 'Show Info' : null}</button>
                </div>
                <div className={`trayBody ${this.state.toggle ? '' : 'hidden'}`} id="card">
                    {watchWarnCards}
                    {tweetCards}
                </div>
            </div>
        )
    }
}

export default Tray;