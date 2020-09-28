let allPlaces = [];
class Place {
    static allPlaces = [];
    constructor(name, latitude, longitude, phone, url, img) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.phone = phone;
        this.url = url;
        this.img = img;
    }

    static findPlaceByName(name) {
        return (allPlaces.find(place => {place.name === name}))
    }

}