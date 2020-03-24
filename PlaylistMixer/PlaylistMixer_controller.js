var token = '';

window.onSpotifyWebPlaybackSDKReady = () => {
    initWebPlayer(); 
};

var app = angular.module('myApp', []);
app.controller('appController', function($scope, $http) { 
  $scope.usersCurrentPlayLists = [];  
  $scope.selectedPlayLists = [];
<<<<<<< HEAD
  $scope.newMixedPlaylist = [];
  $scope.currentPlaybackDetails = [];
=======
  $scope.newMixedPlaylist = []; 
  $scope.deviceList = [];
  $scope.currentlyPlaying = []; 

>>>>>>> c256c85a9f010f8533d343ab06f435e8e1ed17bc

  token = window.location.hash.split('=')[1];
  alert( window.location.hash.split('=') );
  if (token == 'Sample') {
    //alert('sample data'); 
    $scope.usersCurrentPlayLists = SamplePlaylist; 
  }
  else if (!token) {
    alert('No Auth Token');
  }

  getCurrentUsersPlaylists($scope, $http); 
<<<<<<< HEAD
  getCurrentPlaybackState($scope, $http); 
=======

  getCurrentUsersPlayback($scope, $http);
  //webCall_getCurrentPlaybackState($scope, $http); 
  webCall_getDeviceInfo($scope, $http); 
>>>>>>> c256c85a9f010f8533d343ab06f435e8e1ed17bc

  //when a saved playlist is selected, add to Selected Playlist List, 
  //and get tracks
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

   //pause/play button toggle 
   $(document).ready(function() {
    var btn = $(".button");
    btn.click(function() {
      btn.toggleClass("paused");
      return false;
    });
  });




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










