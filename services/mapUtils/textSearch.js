const { api, apiKey, makeCall, constructParams } = require('./helpers');

async function textSearch({ query, location, radius, opennow, type }) {
  const endPoint = `${api}/place/textsearch/json?query=${query}&${constructParams({
    location,
    radius,
    opennow,
    type
  })}key=${apiKey}`;
  console.log(endPoint);
  const response = await makeCall(endPoint);
  const { status, results } = response.data;
  return status === 'OK'
    ? results.map(result => {
        const {
          formatted_address,
          place_id,
          name,
          opening_hours,
          photos,
          rating,
          icon,
          types,
          vicinity,
          geometry: {
            location: { lat, lng }
          }
        } = result;
        return {
          formatted_address,
          lat,
          lng,
          icon,
          name,
          open_now: opening_hours ? opening_hours.open_now : 'NA',
          photos,
          place_id,
          rating,
          types,
          vicinity,
          details: result
        };
      })
    : status;
}

module.exports = {
  textSearch
};
