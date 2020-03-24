function webCall_pause($scope, $http) {
    webServiceCalls($http, 'player/pause', 'PUT'); 
}

function webCall_playPrevious($scope, $http) {
    //alert('prev');
    webServiceCalls($http, 'player/previous', 'Post'); 
}

function webCall_playNext($scope, $http) {
    webServiceCalls($http, 'player/next', 'Post'); 
}

function webCall_getDeviceInfo($scope, $http) {
    webServiceCalls($http, 'player/devices', 'GET', webReturn_getDeviceInfo, $scope ); 
}

function webCall_getCurrentPlaybackState($scope, $http) {
    webServiceCalls($http, $scope, 'player', 'GET', webReturn_getCurrentPlaybackState, $scope); 
}

function webReturn_getCurrentPlaybackState(response, $scope){
    //alert('response playback- '+ JSON.stringify(response)); 
    console.log('response- '+ JSON.stringify(response)); 
}

function webReturn_getDeviceInfo(response, $scope){
    for(let y of response.data.devices){
        let newDevice = new Device(y.id, y.name, y.is_active); 
        $scope.deviceList.push(newDevice);
    }  
}

function webServiceCalls($http, endpoint, method, returnMethod, $scope ) {
    let baseURl = 'https://api.spotify.com/v1/me/'; 
    $http({
        method : method,
        url : baseURl + endpoint, 
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(function mySuccess(response) {
        if (returnMethod){
            //alert('response2- '+ JSON.stringify(response)); 
            returnMethod.call(this, response, $scope);
        }  
    }, function myError(error) {
        //alert('error' + JSON.stringify(error)); 
        console.log('error' + JSON.stringify(error));
    });

}