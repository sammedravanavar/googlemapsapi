const express = require('express');
const cors = require('cors');
const methods = require('./services/mapUtils');

console.log(methods);
const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.get('/api/:method', async (req, res) => {
  const method = methods[req.params.method];
  const data = method ? await method(req.query) : 'Not Found';
  res.send(data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
