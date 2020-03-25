const express = require('express');
const app = express();
const https = require('https');
const CLIENT_SECRET = 123; 
const CLIENT_ID = 456; 
const SPOTIFY_HOST = 'www.google.com';
const SPOTIFY_PATH = '/api/token';
const REDIRECT_URI = 'www';

const body = JSON.stringify({
    grant_type : 'authorization_code',
    client_id : CLIENT_ID,
    client_secret : CLIENT_SECRET,
    redirect_uri : REDIRECT_URI,
})


const REUQEST_DETAILS = {
  hostname : SPOTIFY_HOST,
  port : 443,
 // path : SPOTIFY_PATH,
  method : 'POST',
  headers : {
    "content-type" : "application/x-www-form-urlencoded", 
  },
}
  

app.get('/callback', (request, response) => {
    console.log('code from url - ' ); 
    const getAccesTokenRequest = https.request(REUQEST_DETAILS, response => {
        console.log('response from spotify:' + response );
    })
    getAccesTokenRequest.on('error', (error) => {
        console.log('problem with request: ' + error.message);
    });
    getAccesTokenRequest.write(body)
    getAccesTokenRequest.end();
});

// Logs out of Spotify, then redirects
app.get('/logout', (req,res) => {
    res.clearCookie('spotifyAccessToken');
    res.clearCookie('spotifyRefreshToken');
    res.redirect('/');
  });



  

const listener = app.listen(3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});