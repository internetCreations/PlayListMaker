var token = []; //'BQB52FxlvWi1jpTNztse-tt93_kDHb9QNzNHfGNYJ7NE0OpMDbNxkTd9nWmiHq3YS6VOpDvJBUca0ToJv0UtHRnAWa7LwuwjHhLg5TRNLSyqLJfXApjFc1GdnIdf3BxLiHN-EQboOrC4CIYgTL0';
var player = {};
//var dataSet = []; 


function initWebPlayer() {
   
    player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
   
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

function getCurrentUsersPlaylists($scope, $http) {

    var getUserSavedPlaylistsURL = 'https://api.spotify.com/v1/me/playlists';
  
    $http({
        method : "GET",
        url : getUserSavedPlaylistsURL, 
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    }).then(function mySuccess(response) {
        $scope.parsedResponse = angular.fromJson(response.data); 
    
        for(var x of $scope.parsedResponse.items){
            let newPlaylist = new Playlist(x.id, x.name, x.owner.display_name, x.tracks.total); 
            $scope.usersCurrentPlayLists.push(newPlaylist); 
            console.log('Current Users Playlists -->' + $scope.usersCurrentPlayLists); 
        }  
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
}

function getSelectedPlaylistTracks(userSelectedPlaylist, $scope, $http) {
    getTracksbyPlaylistURL= 'https://api.spotify.com/v1/playlists/' + userSelectedPlaylist.id +'/tracks';
    
    $http({
        method : "GET",
        url : getTracksbyPlaylistURL, 
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    }).then(function mySuccess(response) {
        $scope.selectedPlaylistParsedResponse = angular.fromJson(response.data); 
      
        for(var y of $scope.selectedPlaylistParsedResponse.items){
            let newTrack = new Track(y.track.id, y.track.name); 
            $scope.newMixedPlaylist.push(newTrack);
        }  
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });

}

function playASong($scope, $http) {
    
    var putPlaySongURL = 'https://api.spotify.com/v1/me/player/play';
    var currentlyMixedURIs = $scope.newMixedPlaylist.map(a => a.id); 
    var formatedCurrentlyMixedURIs = [];

    for(var s of currentlyMixedURIs){
        formatedCurrentlyMixedURIs.push("spotify:track:".concat(s));
    }

    $http({
        method : "PUT",
        url : putPlaySongURL, 
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data : {
           "uris": formatedCurrentlyMixedURIs
        }
    }).then(function mySuccess(response) {
        
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    }); 
}

function playNextTrack($scope, $http) {
    
    var playNextTrackURL = 'https://api.spotify.com/v1/me/player/next';

    $http({
        method : "POST",
        url : playNextTrackURL, 
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(function mySuccess(response) {
        
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    }); 
}



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }