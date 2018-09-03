const express = require('express');
const bodyParser = require('body-parser');

const spotifyRouter = require('./routes/spotify');

const app = express();
app.use(bodyParser.json());
app.use('/spotify', spotifyRouter);

app.get('/', (req, res) => {
    res.send('Set redirectUri in /spotify/login route to client url');
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`server listening on port ${port}`);