var app = angular.module('myApp', []);
app.controller('appController', function($scope, $http) { 

    $scope.connect = function() { 
        //alert('test');
        var authURL = 'https://accounts.spotify.com/authorize'
        authURL = authURL + '?client_id=7092039feff042d786be755e2282734f';
        authURL = authURL + '&redirect_uri=https%3A%2F%2Finternetcreations.github.io%2FPlayListMaker%2FPlaylistMixer%2FPlaylistMixer.html';
        authURL = authURL + '&response_type=token'; 
        authURL = authURL + '&scope=user-modify-playback-state'; 
        alert(authURL); 
        window.location.href = authURL;
      }
});