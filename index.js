
let token = '';
let player = {};

window.onSpotifyWebPlaybackSDKReady = () => {
    token = 'BQBspal-L7TW29QMTNTKxzHr8ctKp_SEf0dSQFDRboIpSjmfgjoz-QEOPf87sSNz9QNjQghzzi0Z9Wz1lhaDifEN8is-viL11oJJEiFfSi6NuP_6jo6HU2tXLVrB5KKMUSLtcEq0ojiYCDaj6uVAOq3oKPJnFcPAugD3h48';
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
  constructor(id, name, ownerName, length) {
    this.id = id;
    this.name = name;
    this.ownerName = ownerName;
    this.length = length;
  }
}

class Track {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}



var dataSet = []; 

function getPlaylists() {
    let theUrl = 'https://api.spotify.com/v1/me/playlists';
    let auth = 'Bearer BQBspal-L7TW29QMTNTKxzHr8ctKp_SEf0dSQFDRboIpSjmfgjoz-QEOPf87sSNz9QNjQghzzi0Z9Wz1lhaDifEN8is-viL11oJJEiFfSi6NuP_6jo6HU2tXLVrB5KKMUSLtcEq0ojiYCDaj6uVAOq3oKPJnFcPAugD3h48';
    
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
let auth = 'Bearer BQBspal-L7TW29QMTNTKxzHr8ctKp_SEf0dSQFDRboIpSjmfgjoz-QEOPf87sSNz9QNjQghzzi0Z9Wz1lhaDifEN8is-viL11oJJEiFfSi6NuP_6jo6HU2tXLVrB5KKMUSLtcEq0ojiYCDaj6uVAOq3oKPJnFcPAugD3h48';
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) { 
  $http({
    method : "GET",
      url : theUrl, 
      headers: {
        'Authorization': auth
      } 
  }).then(function mySuccess(response) {
    $scope.parsedResponse = angular.fromJson(response.data); 
    console.log($scope.parsedResponse);
    $scope.playLists = [];
    for(var x of $scope.parsedResponse.items){
      let newPlaylist = new Playlist(x.id, x.name, x.owner.display_name, x.tracks.total); 
      $scope.playLists.push(newPlaylist); 
      console.log($scope.playLists); 
    }
  }, function myError(response) {
    $scope.myWelcome = response.statusText;
  });

  $scope.selectedPlayLists = [];
  $scope.newMixedPlaylist = [];
  $scope.SelectPlaylist = function(x){
    
    //add playlist to list of selected PL
    $scope.selectedPlayLists.push(x); 

    playlistURL= 'https://api.spotify.com/v1/playlists/' + x.id +'/tracks';
    //get tracks for the selected playlist
    $http({
      method : "GET",
        url : playlistURL, 
        headers: {
          'Authorization': auth
        } 
    }).then(function mySuccess(response) {
      $scope.selectedPlaylistParsedResponse = angular.fromJson(response.data);
      console.log($scope.selectedPlaylistParsedResponse.items); 
      alert(typeof $scope.selectedPlaylistParsedResponse.items ); 
      for(var y of  $scope.selectedPlaylistParsedResponse.items){
        let newTrack = new Track(y.track.id, y.track.name); 
        $scope.newMixedPlaylist.push(newTrack);
      }
      //alert(newMixedPlaylist); 
    }, function myError(response) {
      $scope.myWelcome = response.statusText;
    });

  }
 
});





