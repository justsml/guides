// To use the geocodeAddress method from above
let address = '1600 Pennsylvania Ave, Washington DC'

geocodeAddress(address)
  .then(({lat, lng}) => {
    console.log('Found at ', lat, lng)
    return {lat, lng}
  })
  .catch(err => console.error('ERROR: Shit, something broke:', err))
