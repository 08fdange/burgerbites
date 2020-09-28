const baseURL = 'http://localhost:3000/'

function getUsers() {
    return fetch(baseURL + 'users')
    .then(resp => resp.json())
    .then(users => {
        allUsers = [];
        users.forEach(user => {
            allUsers.push(user);
            return allUsers;
        })
    })
}

function getRatings() {
    return fetch(baseURL + 'ratings')
    .then(resp => resp.json())
    .then(ratings => {
        ratings.forEach(function(rating) {
            let stars = rating.stars;
            let user = rating.user_id;
            let place = rating.place;
            let newRating = new Rating(stars, user, place);
            return newRating;
        })
        Rating.getRatingsForCurrentUser();
        currentRatings.forEach(function(rating){
            if (document.getElementById(`${rating.place}`)) {
                let div = document.getElementById(`${rating.place}`)
                let stars = div.childNodes[0].childNodes[0];
                stars.style.width = `${(rating.stars * 20)}%`
            }
        })
    })
}

function postRating(stars, place) {
    fetch(baseURL + 'ratings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'stars': `${stars}`,
            'user_id': `${currentUser.id}`,
            'place': `${place}`
        })
    })
    .then(resp => resp.json())
    .then(obj => {
        if (obj.place == ["has already been taken"]) {
            alert("This place has already been rated by you")
        }
        else if (obj.place == undefined) {
            console.log(obj);
            alert("place is undefined");
        }
        else if (obj.error == undefined ) {
            console.log(obj);
            alert("Rating posted!")
        } 
        else{
            alert(`${obj.error}`);
        }
    })

}

function registerUser(email, password) {
    fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'email': `${email}`,
            'password': `${password}`
        })
    })
    .then(resp => resp.json())
    .then(obj => {
        if (obj.error == undefined) {
            alert(obj.message);
        }
        else {alert(`${obj.error} - Try Again`)}
    })
}

function loginUser(email,password) {
    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'email': `${email}`,
            'password': `${password}`
        })
    })
        .then(resp => resp.json())
        .then(obj => {
            if (previousUser && allRatings != []) {
                currentUser = User.findUser(email);
                logoutButton();
                Rating.getRatingsForCurrentUser();
                currentRatings.forEach(function(rating){
                    if (document.getElementById(`${rating.place}`)) {
                        let div = document.getElementById(`${rating.place}`)
                        let stars = div.childNodes[0].childNodes[0];
                        stars.style.width = `${(rating.stars * 20)}%`
                    }
                })
            }
            else if (obj.error == undefined) {
                currentUser = User.findUser(email);
                previousUser = true;
                logoutButton();
            }
            else {alert(`${obj.error} - Try Again`)}
        })
}

