
let token = '';
let player = {};

window.onSpotifyWebPlaybackSDKReady = () => {
    token = 'BQBmH4yXM6Otxyd66qZf-DBXI6Imkc7ijeKQA8OAG_nrUpTBfJnQTHZWM4FGww22__-s2HfcaKCt76uLNAdTjLxnrbVM1eovrzwyuRRSwleZ2NZFCK_oe1Fv-4pqtqrwUPbvTXp1afw9zgJlX5eAiSbeAquJAWDZK6PkQW0';
    player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });

    doOtherStuff(player); 
};

function doOtherStuff(player){

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.connect(); 

}

function getState(){
    player.getCurrentState().then(state => {
        if (!state) {
          console.error('User is not playing music through the Web Playback SDK');
          return;
        }
      
        let {
          current_track,
          next_tracks: [next_track]
        } = state.track_window;
      
        document.getElementById("state").innerHTML = 'Currently Playing'+ current_track.artists[0] ;
        console.log('Currently Playing', current_track);
        console.log('Playing Next', next_track);
      });
}

function pause(){
    player.pause().then(() => {
        console.log('Paused!');
      });
}

function resume(){
    player.resume().then(() => {
        console.log('Played!');
      });
}


class Playlist {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}



var dataSet = []; 

function getPlaylists() {
    let theUrl = 'https://api.spotify.com/v1/me/playlists';
    let auth = 'Bearer BQBmH4yXM6Otxyd66qZf-DBXI6Imkc7ijeKQA8OAG_nrUpTBfJnQTHZWM4FGww22__-s2HfcaKCt76uLNAdTjLxnrbVM1eovrzwyuRRSwleZ2NZFCK_oe1Fv-4pqtqrwUPbvTXp1afw9zgJlX5eAiSbeAquJAWDZK6PkQW0';
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); 
    xmlHttp.setRequestHeader("Authorization", auth); 
    xmlHttp.send( null ); 
    console.log( JSON.parse(xmlHttp.responseText)); 
    var parsedResponse = JSON.parse(xmlHttp.responseText); 
    console.log(parsedResponse.items); 
    
    for(var x of parsedResponse.items){
        let newPlaylist = new Playlist(x.name, x.id); 
        dataSet.push(newPlaylist); 
    }
}

//getPlaylists(); 

let theUrl = 'https://api.spotify.com/v1/me/playlists';
let auth = 'Bearer BQBmH4yXM6Otxyd66qZf-DBXI6Imkc7ijeKQA8OAG_nrUpTBfJnQTHZWM4FGww22__-s2HfcaKCt76uLNAdTjLxnrbVM1eovrzwyuRRSwleZ2NZFCK_oe1Fv-4pqtqrwUPbvTXp1afw9zgJlX5eAiSbeAquJAWDZK6PkQW0';
   
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  $scope.playLists = [];
  $http({
    method : "GET",
      url : theUrl, 
      headers: {
        'Authorization': auth
      } 
  }).then(function mySuccess(response) {
    $scope.parsedResponse = angular.fromJson(response.data); 
    console.log($scope.parsedResponse);
    for(var x of $scope.parsedResponse.items){
      let newPlaylist = new Playlist(x.name, x.id); 
      //playLists.push(newPlaylist); 
      alert(playLists);
    }

  }, function myError(response) {
    $scope.myWelcome = response.statusText;
  });
  alert(JSON.stringify(playLists)); 
});





