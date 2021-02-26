const { api, apiKey, makeCall } = require('./helpers');

async function placeSearch({ placeName }) {
  const endPoint = `${api}/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry,business_status,icon,place_id,user_ratings_total&key=${apiKey}`;
  const response = await makeCall(endPoint);
  const { status, candidates } = response.data;
  return status === 'OK'
    ? candidates.map(result => {
        const {
          formatted_address,
          name,
          geometry: {
            location: { lat, lng }
          },
          photos,
          place_id
        } = result;
        return {
          address: formatted_address,
          lat,
          lng,
          name,
          photos,
          details: result,
          placeId: place_id
        };
      })
    : status;
}

module.exports = {
  placeSearch
};
