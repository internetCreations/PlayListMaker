
let token = '';
let player = {};

window.onSpotifyWebPlaybackSDKReady = () => {
    token = 'BQAfWtImrHTch1DG_4ES-lMYwkk6eFXwJT9r2IC1req_qZEDiTuNAEFbN-w3r1M2lpDOVhm-yuXzsROGoYUjNMTHhdZy1qGdpFVXsGJop3o0DITjnX7n0ps88kvHkYNs21V5UU-mXEpMRTraoVu18yJ3d7qKTo6CpxIbMyw';
    player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });

    doOtherStuff(player); 
};

function doOtherStuff(player){

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

function getState(){
    player.getCurrentState().then(state => {
        if (!state) {
          console.error('User is not playing music through the Web Playback SDK');
          return;
        }
      
        let {
          current_track,
          next_tracks: [next_track]
        } = state.track_window;
      
        document.getElementById("state").innerHTML = 'Currently Playing'+ current_track.artists[0] ;
        console.log('Currently Playing', current_track);
        console.log('Playing Next', next_track);
      });
}

function pause(){
    player.pause().then(() => {
        console.log('Paused!');
      });
}

function resume(){
    player.resume().then(() => {
        console.log('Played!');
      });
}


class Playlist {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}



var dataSet = []; 

function getPlaylists() {
    let theUrl = 'https://api.spotify.com/v1/me/playlists';
    let auth = 'Bearer BQAfWtImrHTch1DG_4ES-lMYwkk6eFXwJT9r2IC1req_qZEDiTuNAEFbN-w3r1M2lpDOVhm-yuXzsROGoYUjNMTHhdZy1qGdpFVXsGJop3o0DITjnX7n0ps88kvHkYNs21V5UU-mXEpMRTraoVu18yJ3d7qKTo6CpxIbMyw';
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); 
    xmlHttp.setRequestHeader("Authorization", auth); 
    xmlHttp.send( null ); 
    console.log( JSON.parse(xmlHttp.responseText)); 
    var parsedResponse = JSON.parse(xmlHttp.responseText); 
    console.log(parsedResponse.items); 
    
    for(var x of parsedResponse.items){
        let newPlaylist = new Playlist(x.name, x.id); 
        dataSet.push(newPlaylist); 
    }
}

getPlaylists(); 

$(document).ready(function() {
  $.noConflict();
  

  $('#example').DataTable( {
      data: dataSet,
      columns: [
          { data: 'name' },
          { data: "id" }
      ], 
      select: {
        style:    'os',
        selector: 'td:first-child'
    }
  } );
  $('#example tbody').on( 'click', 'tr', function () {
    $(this).toggleClass('selected');
    console.log( JSON.stringify($('#example').DataTable().rows('.selected'))  );
  } );
} ); 





