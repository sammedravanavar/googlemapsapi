const { api, apiKey, makeCall, constructParams } = require("./helpers");

async function distancematrix({ origins, destinations }) {
  const endPoint = `${api}/distancematrix/json?units=metric&${constructParams({
    origins,
    destinations
  })}key=${apiKey}`;
  console.log(endPoint);
  const response = await makeCall(endPoint);
  const {
    status,
    destination_addresses,
    origin_addresses,
    rows
  } = response.data;
  return status === "OK"
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
