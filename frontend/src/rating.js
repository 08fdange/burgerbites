let allRatings = [];
class Rating {
    constructor(stars, user, place) {
        this.stars = stars;
        this.user = user;
        this.place = place;
        allRatings.push(this)
    }

}