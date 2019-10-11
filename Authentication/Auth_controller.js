var app = angular.module('myApp', []);
app.controller('appController', function($scope, $http) { 

    $scope.connect = function() { 
        //alert('test');
        var authURL = 'https://accounts.spotify.com/authorize'
        authURL = authURL + '?client_id=7092039feff042d786be755e2282734f';
        //authURL = authURL + '&redirect_uri=file%3A%2F%2F%2FC%3A%2FUsers%2Fb-m.i.smith%2FDesktop%2FGitHub%2FGit%2520Repo%2FPlayListMaker%2FPlayListMaker%2FAuthentication%2FAuth.html';
        authURL = authURL + '&redirect_uri=https%3A%2F%2Finternetcreations.github.io%2FPlayListMaker%2FPlaylistMixer%2FPlaylistMixer.html';
        authURL = authURL + '&response_type=token'; 
        
        window.location.href = authURL;
      }
});