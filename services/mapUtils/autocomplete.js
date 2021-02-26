const crypto = require('crypto');
const { api, apiKey, makeCall, constructParams } = require('./helpers');

const sessionToken = crypto.randomBytes(16).toString('base64');

async function autocomplete({ input, location, radius, types }) {
  const endPoint = `${api}/place/autocomplete/json?input=${input}&${constructParams({
    location,
    radius,
    types
  })}key=${apiKey}&sessiontoken=${sessionToken}`;
  console.log(endPoint);
  const response = await makeCall(endPoint);
  const { status, predictions } = response.data;
  return status === 'OK'
    ? predictions.map(result => {
        const { description, distance_meters, id, place_id, types } = result;
        return {
          description,
          distance: distance_meters,
          id,
          placeId: place_id,
          types,
          details: result
        };
      })
    : status;
}

module.exports = {
  autocomplete
};
