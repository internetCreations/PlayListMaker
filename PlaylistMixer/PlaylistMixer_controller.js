var token = '';

window.onSpotifyWebPlaybackSDKReady = () => {
    initWebPlayer(); 
};

var app = angular.module('myApp', []);
app.controller('appController', function($scope, $http) { 
  $scope.usersCurrentPlayLists = [];  
  $scope.selectedPlayLists = [];
  $scope.newMixedPlaylist = [];

  //get current users token
  token = window.location.hash.split('=')[1]; 

  getCurrentUsersPlaylists($scope, $http); 

  

  //when a saved playlist is selected, add to Selected Playlist List, and get tracks
  $scope.userSelectsPlaylist = function(userSelectedPlaylist){
    
    $scope.selectedPlayLists.push(userSelectedPlaylist);
    
    getSelectedPlaylistTracks(userSelectedPlaylist, $scope, $http); 
  }

  // when ..........   play the playlist
  $scope.playASong = function() {
    //alert('test'); 
    playASong($scope, $http); 
  }

  $scope.playNextTrack = function() {
    playNextTrack($scope, $http); 
  }

  $scope.shuffle = function() { 
    $scope.newMixedPlaylist = shuffle($scope.newMixedPlaylist); 
  }

  $scope.pause = function() { 
    $scope.pause($scope, $http); 
  }

  $scope.getDeviceInfo = function() { 
    getCurrentDeviceID($scope, $http); 
  }

});









