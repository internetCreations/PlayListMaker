var token = 'BQCH0-lMyZzM8zofTCjQrTkBN6LOHbazBuzZ5x0R0H-kJ5LIRFJMKRczhcrslLa37Q_nZKzWa35OzC2dgtd5_cra_JjJv0LHT8797wqnPWO9TVZcsLXYZjps7eUJc-lq6T309es52EuOJTjzDknG-G0l2rH-NpIzU6oElNM';
var player = {};
var dataSet = []; 

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
      
        for(var y of  $scope.selectedPlaylistParsedResponse.items){
            let newTrack = new Track(y.track.id, y.track.name); 
            $scope.newMixedPlaylist.push(newTrack);
        }
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });

}

function playASong() {
    const play = ({
        spotify_uri,
        playerInstance: {
            _options: {
            getOAuthToken,
            id
            }
        }
        }) => {
        getOAuthToken(access_token => {
            fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            });
        });
        };
        
        play({
        playerInstance: new Spotify.Player({ name: "..." }),
        spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
        });
}