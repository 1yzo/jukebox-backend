const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const clientId = 'a13abbf09afa4d1c83555b877860fca5';
const clientSecret = 'ab450ef76504464790692a360259f731'; // Reset before production
const redirectUri = 'http://localhost:3001/spotify/callback';
const clientUri = 'http://localhost:3000/selection';

const state = {
    access_token: undefined
};

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
    const details = {
        'client_id': clientId,
        'client_secret': clientSecret,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': redirectUri
    };
    let formBody = [];
    for (let property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(`${encodedKey}=${encodedValue}`)
    }
    formBody = formBody.join('&');

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: formBody,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    })
        .then((response) => response.json())
        .then((response) => { 
            console.log(response.access_token);
            state.access_token = response.access_token;
            res.redirect(clientUri);
        });
});    

router.get('/token', (req, res) => {
    res.json(state.access_token);
});

module.exports = router;
