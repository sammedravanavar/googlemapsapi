const { api, apiKey, makeCall, constructParams } = require('./helpers');
//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615,-73.9976592&key=YOUR_API_KEY


//https://maps.googleapis.com/maps/api/distancematrix/xml?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR&key=YOUR_API_KEY


async function distancematrix({ origins, destinations }) {
  const endPoint = `${api}/distancematrix/json?units=metric&${constructParams({ origins, destinations })}key=${apiKey}`;
  console.log(endPoint);
  const response = await makeCall(endPoint);
  const { status, destination_addresses, origin_addresses, rows } = response.data;
  return status === 'OK'
    ? {
      distance: rows[0].elements[0].distance.text,
      duration: rows[0].elements[0].duration.text,
      fromAddress: origin_addresses[0],
      toAddress: destination_addresses[0],
      details: response.data
    }
    : status;
}

module.exports = {
  distancematrix
};
