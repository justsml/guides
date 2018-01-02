// From my feedback & code here: https://krzysztofzuraw.com/blog/2017/callbacks-promises-in-js-for-newbies.html
const geocoder = new google.maps.Geocoder();
// Most JS API's let you use Bluebird.promisify[All]
// Unfortunately Google's APIs are a little dumb when it comes to promises and Node callbacks.
const geocodeAddress = (address) => new Promise((resolve, reject) => geocoder
  .geocode({ address }, (results, status) => status === 'OK'
    ? resolve({
      lat: results[0].geometry.location.lat(),
      lng: results[0].geometry.location.lng(),
    }) : reject(new Error('Cannot find address'))
}));


