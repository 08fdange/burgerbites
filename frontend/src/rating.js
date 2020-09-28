let allRatings = [];
let currentRatings = [];

class Rating {
    constructor(stars, user, place) {
        this.stars = stars;
        this.user = user;
        this.place = place;
        allRatings.push(this);
    }

    static getRatingsForCurrentUser() {
        currentRatings = allRatings.filter(rating => rating.user === currentUser.id)
    }

    // static displayStarsForRatings() {
    //     currentRatings.forEach(function(rating) {
    //         if ()
    //     })
    // }
}