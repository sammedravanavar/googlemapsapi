const { api, apiKey, makeCall } = require('./helpers');

async function placeDetails({ placeId }) {
  const endPoint = `${api}/place/details/json?place_id=${placeId}&fields=business_status,formatted_address,geometry,icon,name,photo,place_id,type,url,vicinity,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total&key=${apiKey}`;
  const response = await makeCall(endPoint);
  const { status, result } = response.data;
  return status === 'OK' ? result : status;
}

module.exports = {
  placeDetails
};
