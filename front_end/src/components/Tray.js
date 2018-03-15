import React, { Component } from 'react';

const COLORS = {
    'GL' : '#b2c2de',
    'WS' : '#e8bcd1',
}


class Tray extends Component {
    state = {
        toggle: false,
        watchwarn: [],
        bounds: []
    }

    _handleTrayToggle = (e) => {
        const toggle = !this.state.toggle;
        this.setState({toggle});
    }

    componentWillUpdate() {
        if(JSON.stringify(this.props.bounds) !== JSON.stringify(this.state.bounds)){
            console.log('update bounds');
            this.setState({bounds: this.props.bounds}, () => this.getWatchWarnInBound());
        }
    }

    //get all watches and warnings in viewport
    getWatchWarnInBound = () => {
        if(this.state.bounds){
            const bounds = this.state.bounds;
            fetch(`https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/1/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=0&geometry={"xmin":${bounds[0]},"ymin":${bounds[1]},"xmax":${bounds[2]},"ymax":${bounds[3]},"spatialReference":{"wkid":4326}&geometryType=esriGeometryEnvelope&inSR=4326&outFields=*&outSR=4326`)
                .then(res => res.json())
                .then(data => {
                    const watchwarn = data.features;
                    this.setState({watchwarn});
            });
        }
    }

    render(){
        const cards = this.state.watchwarn.map(i => {
            const { phenom, prod_type, wfo, url, warnid } = i.attributes;
            const style = {background: COLORS[phenom]}
            return(
                <div style={style} key={warnid}>
                    <p>{phenom} - {prod_type} {wfo}</p>
                    <p><a target='_blank' href={url}>{warnid}</a></p>
                </div>
            )
        })
        return(
            <div className='tray'>
                <div className='trayHeader'>
                    <div onClick={this._handleTrayToggle}>toggle</div>
                </div>
                <div className={`trayBody ${this.state.toggle ? '' : 'hidden'}`}>
                    {cards}
                </div>
            </div>
        )
    }
}

export default Tray;