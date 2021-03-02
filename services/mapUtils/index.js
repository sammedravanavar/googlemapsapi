const { placeSearch } = require('./placeSearch');
const { placeDetails } = require('./placeDetails');
const { nearBySearch } = require('./nearBySearch');
const { geoCode } = require('./geoCode');
const { textSearch } = require('./textSearch');
const { autocomplete } = require('./autocomplete');
const { distancematrix } = require('./distanceMatrix');
const { getNearest } = require('./getNearest');

module.exports = {
  placeSearch,
  placeDetails,
  geoCode,
  textSearch,
  autocomplete,
  nearBySearch,
  distancematrix,
  getNearest
};
