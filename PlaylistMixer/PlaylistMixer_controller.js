import { RouterModule, Routes } from '@angular/router';


window.onSpotifyWebPlaybackSDKReady = () => {
    initWebPlayer(); 
};

var app = angular.module('myApp', []);
app.controller('appController', function($scope, $http) { 
  $scope.usersCurrentPlayLists = [];  
  $scope.selectedPlayLists = [];
  $scope.newMixedPlaylist = [];

  //on load, get current users playlists
  getCurrentUsersPlaylists($scope, $http); 

  //when a saved playlist is selected, add to Selected Playlist List, and get tracks
  $scope.userSelectsPlaylist = function(userSelectedPlaylist){
    
    $scope.selectedPlayLists.push(userSelectedPlaylist);
    
    getSelectedPlaylistTracks(userSelectedPlaylist, $scope, $http); 

  }

  
  $scope.playASong = function(){
  
    playASong($scope, $http); 
  }

});









