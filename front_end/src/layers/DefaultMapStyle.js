import { fromJS } from 'immutable';
import MAP_STYLE from './map-style-basic-v8.json';

export const zoomThreshold = 9;

//https://uber.github.io/react-map-gl/#/Examples/dynamic-styling
const DefaultMapStyle = fromJS(MAP_STYLE);
export default DefaultMapStyle;