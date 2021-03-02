const axios = require('axios');

const apiKey = 'AIzaSyAks532R6bhVllJruQq7ygBT4E89MsWeEU';
const api = `https://maps.googleapis.com/maps/api`;

function constructParams(params) {
  return Object.keys(params).reduce((acc, cur) => {
    if (params[cur]) {
      return `${acc}${cur}=${params[cur]}&`;
    }
    return acc;
  }, '');
}

async function makeCall(endPoint) {
  let response;
  await axios
    .get(endPoint)
    .then(data => {
      response = data;
    })
    .catch(err => {
      console.log(err);
    });
  return response;
}

module.exports = {
  constructParams,
  makeCall,
  api,
  apiKey
};
