/** 
 * @location.js
 * 
 * contains functions for geocoding and geolocation
*/

//Promise returns latlng array of user's location
function getGeoLocation(){
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                resolve([position.coords.latitude, position.coords.longitude]);
            }, error => reject(error));
        }else{
            reject('Not Supported');
        }
    });
}

//zooms to location on the map
function zoomIntoLocation(lat, lng, zoom){
    map.flyTo({
        center: [lng, lat],
        zoom,
    })
}

//zoom to user's location
getGeoLocation()
    .then(latlng => zoomIntoLocation(...latlng, 16))
    .catch(error=> console.error(error));


//note probably use places api would be better, https://developers.google.com/maps/documentation/javascript/places-autocomplete
const GMAPS_GEOCODE_API_BASEURL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC9ttZBPd8XQur7pf85P6xkffJCdQG9Ca4";

//Promise returns latlng array of first result
function getLocationAddress(address){
    return new Promise((resolve, reject) => {
        return fetch(`${GMAPS_GEOCODE_API_BASEURL}&address=${address}`)
        .then(res => res.json())
        .then(data => {
            if(data.status === 'OK'){
                const {lat, lng} = data.results[0].geometry.location;
                resolve([lat, lng]);
            }else{
                reject(data.status);
            }
        });
    });
}

//zoom to address 'bmcc fiterman hall'
getLocationAddress('bmcc fiterman hall')
    .then(latlng => zoomIntoLocation(...latlng, 16))
    .catch(error => console.error(error))