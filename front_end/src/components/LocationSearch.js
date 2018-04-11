import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
 
class LocationSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: 'New York City' }
    this.onChange = (address) => this.setState({ address })
  }
 
  handleSelect = (event) => {
    geocodeByAddress(event)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          this.props.zoomToLocation(latLng, 14);
          return latLng;
      })
      .then(latLng => console.log('Success', latLng, this.state.address))
      .catch(error => console.error('Error', error, this.state.address))
  }
 
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
 
    return (
    <div className="location-search">
        <PlacesAutocomplete 
            inputProps={inputProps} 
            onSelect={this.handleSelect}/>
    </div>
    )
  }
}
 
export default LocationSearch;