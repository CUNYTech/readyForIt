/** 
 * @location.js
 * 
 * contains functions for geocoding and geolocation
*/

//Promise returns latlng array of user's location
export function getGeoLocation(){
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                resolve({lat: position.coords.latitude, lng: position.coords.longitude});
            }, error => reject(error));
        }else{
            reject('Not Supported');
        }
    });
}



//Promise returns latlng array of first result
export function getLocationAddress(address){
    //note probably use places api would be better, https://developers.google.com/maps/documentation/javascript/places-autocomplete
    const GMAPS_GEOCODE_API_BASEURL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC9ttZBPd8XQur7pf85P6xkffJCdQG9Ca4";


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

