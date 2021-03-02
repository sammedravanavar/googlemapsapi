const { api, apiKey, makeCall, constructParams } = require('./helpers');
// const distanceMatrix = require('./distanceMatrix');

async function nearBySearch({ location, radius, type, keyword, opennow, rankby }) {
  const endPoint = `${api}/place/nearbysearch/json?${constructParams({
    location,
    radius: rankby ? '': radius,
    type,
    keyword,
    opennow,
    rankby
  })}key=${apiKey}`;
  console.log(endPoint);
  const response = await makeCall(endPoint);
  const { status, results } = response.data;
  return status === 'OK'
    ? {
      results: results.map(result => {
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
          name,
          lat,
          lng,
          // distance: await distanceMatrix(location, `${lat},${lng}`), 
          vicinity,
          business_status,
          open_now: opening_hours ? opening_hours.open_now : 'NA',
          icon,
          photos,
          place_id,
          price_level,
          rating,
          types,
          user_ratings_total,
          details: result
        };
      })
    }
    : status;
}

module.exports = {
  nearBySearch
};
