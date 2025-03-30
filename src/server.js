const express = require('express');
const cors = require('cors');
const apiRouter = require('./router');
const config = require('./utils/config');
const { kMessages, kStatusCodes } = require('./utils/constants');
const dbConnect = require('../src/db/dbconnect');
console.log("hi");
const app = express();
dbConnect();
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

const port = config.port;

app.use(apiRouter);

// Handle 404 errors
app.use((_, res) => {
  return res.status(kStatusCodes.NOT_FOUND).send({
    status: 0,
    message: kMessages.NDF404,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
