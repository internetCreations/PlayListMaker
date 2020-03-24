class Playlist {
  constructor(id, name, ownerName, length) {
    this.id = id;
    this.name = name;
    this.ownerName = ownerName;
    this.length = length;
  }
}
  
class Track {
  constructor(id, name, artist, url) {
    this.id = id;
    this.name = name;
    this.artist = artist; 
    this.url = url;
  }
}

class Device {
  constructor(id, name, isActive) {
    this.id = id;
    this.name = name;
    this.isActive = isActive;
  }
}