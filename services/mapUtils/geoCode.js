const { api, apiKey, makeCall } = require('./helpers');

async function geoCode({ address }) {
  const endPoint = `${api}/geocode/json?address=${address}&key=${apiKey}`;
  const response = await makeCall(endPoint);
  const { status, results } = response.data;
  return status === 'OK'
    ? results.map(result => {
        const {
          formatted_address,
          place_id,
          geometry: {
            location: { lat, lng }
          }
        } = result;
        return {
          address: formatted_address,
          lat,
          lng,
          placeId: place_id,
          details: result
        };
      })
    : status;
}

module.exports = {
  geoCode
};
