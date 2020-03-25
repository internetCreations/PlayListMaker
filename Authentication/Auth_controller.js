var app = angular.module('myApp', []);
app.controller('appController', function($scope, $http) { 

    $scope.connect = function() { 
        scopes = ['user-read-playback-state', 'user-modify-playback-state'];
        var authURL = 'https://accounts.spotify.com/authorize' +
                      '?client_id=7092039feff042d786be755e2282734f' +
                      '&redirect_uri=https%3A%2F%2Finternetcreations.github.io%2FPlayListMaker%2FPlaylistMixer%2FPlaylistMixer.html' +
                      '&response_type=code'; 
        authURL = authURL + '&scope=' + scopes; 

        window.location.href = authURL;
      }
});