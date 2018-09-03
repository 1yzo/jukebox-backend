const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const clientId = 'a13abbf09afa4d1c83555b877860fca5';
const clientSecret = 'ab450ef76504464790692a360259f731'; // Reset before production
const redirectUri = 'http://localhost:3001/spotify/callback';

router.get('/login', function(req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + clientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirectUri));
});

router.get('/callback', (req, res) => {
    const code = req.query.code;
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
        }),
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
        },
    })
        .then((response) => console.log(response));
});    
    
module.exports = router;
