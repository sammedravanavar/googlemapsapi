const { api, apiKey, makeCall, constructParams } = require('./helpers');

async function nearBySearch({ location, radius, type, keyword, opennow }) {
  const endPoint = `${api}/place/nearbysearch/json?${constructParams({
    location,
    radius,
    type,
    keyword,
    opennow
  })}key=${apiKey}`;
  console.log(endPoint);
  const response = await makeCall(endPoint);
  const { status, results } = response.data;
  return status === 'OK'
    ? results.map(result => {
        const {
          business_status,
          geometry: {
            location: { lat, lng }
          },
          icon,
          name,
          opening_hours,
          photos,
          place_id,
          price_level,
          rating,
          types,
          user_ratings_total,
          vicinity
        } = result;
        return {
          business_status,
          lat,
          lng,
          icon,
          name,
          open_now: opening_hours ? opening_hours.open_now : 'NA',
          photos,
          place_id,
          price_level,
          rating,
          types,
          user_ratings_total,
          vicinity,
          details: result
        };
      })
    : status;
}

module.exports = {
  nearBySearch
};
