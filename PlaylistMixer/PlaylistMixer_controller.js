var token = '';

window.onSpotifyWebPlaybackSDKReady = () => {
    initWebPlayer(); 
};

var app = angular.module('myApp', []);
app.controller('appController', function($scope, $http) { 
  $scope.usersCurrentPlayLists = [];  
  $scope.selectedPlayLists = [];
  $scope.newMixedPlaylist = []; 
  $scope.deviceList = [];
  $scope.currentlyPlaying = []; 


  //get current users token
  token = window.location.hash.split('=')[1]; 

  getCurrentUsersPlaylists($scope, $http); 

  getCurrentUsersPlayback($scope, $http);
  //webCall_getCurrentPlaybackState($scope, $http); 
  webCall_getDeviceInfo($scope, $http); 

  //when a saved playlist is selected, add to Selected Playlist List, and get tracks
  $scope.userSelectsPlaylist = function(userSelectedPlaylist){
    
    $scope.selectedPlayLists.push(userSelectedPlaylist);
    
    getSelectedPlaylistTracks(userSelectedPlaylist, $scope, $http); 
  }

  $scope.playNextTrack = function() {
    webCall_playNext($scope, $http); 
  } 

  $scope.playPreviousTrack = function() {
    webCall_playPrevious($scope, $http); 
  } 

  $scope.shuffle = function() { 
    $scope.newMixedPlaylist = shuffle($scope.newMixedPlaylist); 
  }

  $scope.getDeviceInfo = function() { 
    webCall_getDeviceInfo($scope, $http); 
  }

  $scope.togglePlayPause = function() { 
    var playElement = document.getElementById("play");
    var pauseElement = document.getElementById("pause");
    if( !pauseElement.style.display || pauseElement.style.display == 'none'){
      playElement.style.display = "none";
      pauseElement.style.display = 'initial';
      playASong($scope, $http); 
    } else if(playElement.style.display == "none" || playElement.style.display == 'none' ) {
      playElement.style.display = "initial";
      pauseElement.style.display = 'none';
      webCall_pause($scope, $http); 
    }
  }
});










