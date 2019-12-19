function getCurrentUsersPlayback($scope, $http) {
    let playbackURL= 'https://api.spotify.com/v1/me/player';

    $http({
        method : "GET",
        url : playbackURL, 
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    }).then(function mySuccess(response) {  
        $scope.currentlyPlayingTrack = new Track(response.data.item.id,
                                            response.data.item.name, 
                                            response.data.item.artists[0].name,
                                            response.data.item.album.images[1].url
                                            ); 
    }, function myError(response) { 
        console.log( 'hello world3'+ JSON.stringify(response)); 
    });
}