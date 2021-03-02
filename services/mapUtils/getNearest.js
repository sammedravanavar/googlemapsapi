const { distancematrix } = require("./distanceMatrix");
const { nearBySearch } = require("./nearBySearch");

async function getNearest(params) {
  const data = await nearBySearch(params);
  const result = data.results[0];
  const { name, lat, lng, vicinity, business_status, open_now } = result;
  const distanceResult = await distancematrix({
    origins: params.location,
    destinations: `${lat},${lng}`
  });
  const { distance, duration } = distanceResult;
  return {
    name,
    lat,
    lng,
    distance,
    duration,
    vicinity,
    business_status,
    open_now
  };
}

module.exports = {
  getNearest
};
