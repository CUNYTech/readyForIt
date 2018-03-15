import React from 'react';

const LayersMenu = ({layers, onLayerMenuClick}) => {
    const layerButtons = Object.keys(layers).map(layer => {
        const active = layers[layer] ? 'active' : '';
        
        return <a className={active} onClick={() => onLayerMenuClick(layer)} key={layer}>{layer}</a>
    });
    
    return(
    <div className="layersMenu">
        {layerButtons}
    </div>
    )
}

export default LayersMenu;