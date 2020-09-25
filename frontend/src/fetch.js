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
        console.log(ratings);
    })
}

function postRating(rating) {
    fetch(baseURL + 'ratings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'stars': `${rating.stars}`,
            'user_id': `${currentUser.id}`
        })
    })
    .then(resp => resp.json())
    .then(obj => {
        if (obj.error == undefined) {
            console.log(obj);
            debugger;
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
            if (obj.error == undefined) {
                user = User.findUser(email);
                currentUser = new User(user.id, user.email);
                logoutButton();
            }
            else {alert(`${obj.error} - Try Again`)}
        })
}

