function webCall_pause($scope, $http) {
    webServiceCalls($http, 'player/pause', 'PUT'); 
}

function webCall_playPrevious($scope, $http) {
    webServiceCalls($http, 'player/previous', 'Post'); 
}

function webCall_playNext($scope, $http) {
    webServiceCalls($http, 'player/next', 'Post'); 
}


function webCall_getDeviceInfo($scope, $http) {
    webServiceCalls($http, 'player/devices', 'GET', webReturn_getDeviceInfo ); 
}

function webReturn_getDeviceInfo(response){
    //alert('response- '+ JSON.stringify(response)); 
}

function webServiceCalls($http, endpoint, method, returnMethod ) {
    let baseURl = 'https://api.spotify.com/v1/me/'; 
    $http({
        method : method,
        url : baseURl + endpoint, 
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(function mySuccess(response) {
        if (returnMethod){
            returnMethod.call(this, response);
        }  
    }, function myError(error) {
        alert('error' + JSON.stringify(error)); 
        console.log('error' + JSON.stringify(error));
    });

}