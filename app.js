const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`server listening on port ${port}`);