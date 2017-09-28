console.log('keys.js is loaded');

var Twitter = require('twitter');

var twitter = new Twitter({
  consumer_key: "PI4wACF4hCHyAbBabE1ngwpM2",
  consumer_secret: "CI8mKek0rrn1Z1DtgAXQ4bW7fTPt5pxHK2pmsv4s90LpE621mM",
  access_token_key: "866949086-kzk1bcbP0PEpaLzfBFsT3AzWLxh0VEL3mRLssqyK",
  access_token_secret: "jypU79dR3NmgWDPD828OQtIcit49pjbGqWOBTZb0ySv6J",
  app_only_auth: true,
});


var Spotify = require('node-spotify-api');

var spotify = new Spotify({
      id: "17abb4f14de64a0f8a5089a9df5ecfdc",
      secret: "e6735b76112a451387e3df863eee17b3"
    });


module.exports = {
twitter: twitter, 
spotify: spotify
}
