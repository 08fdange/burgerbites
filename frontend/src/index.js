const yelp_url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=burgers&location="

let header = new Headers();
let apiKey = 'voUp6nNdDuCvVAPqabptaFxlas6PdV6VFUW7T4xj5qC7AtudQ1NBNLzphRLMV2ZF4C9TaPog-W_7SciRKUYiF7IKUCSX6ktcrSGRNehWe0QrmNuAFjwgVBwRvelfX3Yx'
header.append('Authorization', `Bearer ${apiKey}`)

function getPlacesByQuery() {
    fetch(`${yelp_url}${locationInput.value}`, {
        method: 'GET',
        headers: header
    })
    .then(function(resp) {
        return resp.json();
    })
    .then(function(arrObjs) {
        arrObjs.businesses.forEach(function(obj) {
            const name = obj.name;
            const latitude = obj.coordinates.latitude;
            const longitude = obj.coordinates.longitude;
            const phone = obj.display_phone;
            const url = obj.url
            const img = obj.image_url;

            let place = new Place(name, latitude, longitude, phone, url, img)
            allPlaces.push(place)
        })
        displayPlaces();
    })
}

function displayPlaces(){
    //create main places container and ul
    const container = document.createElement('div')
    container.className = 'places-container'
    const ul = document.createElement('ul');
    ul.id = "places-list";

    //iterate through allPlaces and display each one and it's attributes
    allPlaces.forEach(function(obj){
        const li = document.createElement('li');
        li.className = 'place-li-item';
        const div = document.createElement('div');
        div.className = 'place-div';
        const formDiv = document.createElement('div');
        formDiv.className = 'rating-form-div';
        const img = document.createElement('img');
        img.src = obj.img;
        img.className = 'place-image';
        const h1 = document.createElement('h1');
        h1.innerText = obj.name;
        const a = document.createElement('a');
        a.className = 'phone-number';
        a.href = `tel:${obj.phone}`;
        a.innerHTML += '<br>';
        a.innerText = obj.phone;
        a.innerHTML += '<br>'
        const a2 = document.createElement('a');
        a2.className = 'place-url'
        a2.href = obj.url;
        a2.innerText = 'URL';
        a2.innerHTML += '<br>';
        const starsOuter = document.createElement('div');
        starsOuter.className = 'stars-outer';
        const starsInner = document.createElement('div');
        starsInner.className = 'stars-inner';
        const ratingButton = document.createElement('button');
        ratingButton.className = 'rating-dropdown-button';
        ratingButton.textContent = 'Rate';

        //append elements
        div.appendChild(h1);
        div.appendChild(starsOuter);
        // starsOuter.appendChild(starsInner);
        div.appendChild(formDiv);
        formDiv.appendChild(ratingButton);
        div.innerHTML += '<br>';
        div.appendChild(a);
        div.appendChild(a2);
        div.appendChild(img);
        li.appendChild(div);
        ul.appendChild(li);
        container.appendChild(ul);
        
    })

    document.getElementsByTagName('main')[0].appendChild(container);
    let ratingButtonsList = document.getElementsByClassName('rating-dropdown-button');
    
    //event listener for rating button
    for (let button of ratingButtonsList) {
        button.addEventListener('click', function() {
            if (document.getElementsByClassName('rating-form').length == 0 && currentUser) {
                let form = document.createElement('form');
                form.className = 'rating-form';
                let input = document.createElement('input');
                input.name = 'stars';
                input.type = 'number';
                input.max = 5;
                input.min = 1;
                let submit = document.createElement('input');
                submit.type = 'submit';
                submit.value = "Submit Rating";
                button.parentNode.appendChild(form);
                form.appendChild(input);
                form.appendChild(submit);
                
                //event listener for form submit
                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    let stars = event.target.elements[0].value;
                    rating = new Rating(stars, currentUser);
                    postRating(rating);
                })
            }
            else if(!currentUser) {
                alert("Must be logged in to rate!");
            }
            
            else {
                let form = document.getElementsByClassName('rating-form')[0];
                form.parentNode.removeChild(form);
            }
        })
    }
}

// Forms

function registrationForm() {
    const form = document.createElement('form');
    form.setAttribute('class', 'registration-form');
    form.setAttribute('id', 'registration-form')

    const input1 = document.createElement('input');
    input1.name = 'email';
    input1.placeholder = 'Email';
    input1.value = '';

    const input2 = document.createElement('input');
    input2.type = 'password';
    input2.name = 'password';
    input2.placeholder = 'Password';
    input2.value = '';

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = "Register";

    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(submit);

    return form;

}

function loginForm() {
    const form = document.createElement('form');
    form.setAttribute('class', 'login-form');
    form.setAttribute('id', 'login-form');

    const input1 = document.createElement('input');
    input1.name = 'email';
    input1.placeholder = 'Email';
    input1.value = '';

    const input2 = document.createElement('input');
    input2.type = 'password';
    input2.name = 'password';
    input2.placeholder = 'Password';
    input2.value = '';

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = "Log In";

    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(submit);

    return form;

}

function logoutButton() {
    //hide registration, login buttons and form
    let regisButton = document.getElementById('registration-dropdown-button');
    let loginButton = document.getElementById('login-dropdown-button');
    regisButton.style.display = 'none';
    loginButton.style.display = 'none';
    if(document.getElementsByClassName('login-form')[0] != null) {
        const lform = document.getElementsByClassName('login-form')[0];
        lform.parentNode.removeChild(lform);
    }
    if(document.getElementsByClassName('registration-form')[0] != null) {
        const rform = document.getElementsByClassName('registration-form')[0];
        rform.parentNode.removeChild(rform);
    }

    //logged in user text
    userText = document.createElement('h3');
    userText.innerText = `Logged in as ${currentUser.email}`

    //create logout button
    button = document.createElement('button');
    button.innerText = "Log Out";

    //append to user-form-div
    let logoutDiv = document.getElementById('logout-div');
    logoutDiv.appendChild(userText);
    logoutDiv.appendChild(button);

    //add event listener for logout
    button.addEventListener('click', function() {
        userText.parentNode.removeChild(userText)
        button.parentNode.removeChild(button)
        regisButton.style.display = 'block';
        loginButton.style.display = 'block';
        currentUser = null;
    })

}

let registrationDropdownButton = document.getElementById("registration-dropdown-button");
let loginDropdownButton = document.getElementById("login-dropdown-button");
let locationForm = document.getElementById("location-form");
let locationInput = locationForm.getElementsByTagName('input')[0];

// Listeners

registrationDropdownButton.addEventListener('click', function(event) {
    event.preventDefault();
    const container = document.getElementById('user-form-container');
    //if registration form doesn't exist create form
    if (document.getElementsByClassName('registration-form').length < 1) {
        const rform = registrationForm();
        container.appendChild(rform);
    }
    //else remove the form from existence if dropdown button is clicked
    else { 
        const rform = document.getElementsByClassName('registration-form')[0];
        rform.parentNode.removeChild(rform);
        // rform.style.display = 'none';
    }
    //if registration form exists adds eventListener for submit button to register user
    if (document.getElementById('registration-form') !== null) {
        document.getElementById('registration-form').addEventListener('submit', function(e) {
            e.preventDefault();
            let email = document.getElementById('registration-form').getElementsByTagName('input')[0].value;
            let password = document.getElementById('registration-form').getElementsByTagName('input')[1].value;
            registerUser(email,password);
            
        })
    }
 
})

loginDropdownButton.addEventListener('click', function() {
    const container = document.getElementById('user-form-container');
    //if login form doesn't exist creates the form
    if (document.getElementsByClassName('login-form').length < 1) {
        const lform = loginForm();
        container.appendChild(lform)
    }
    //else removes from from existence if dropdown button is clicked
    else {
        const lform = document.getElementsByClassName('login-form')[0];
        lform.parentNode.removeChild(lform);
    }
    //if form exists adds event listener for login submit button
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            let email = document.getElementById('login-form').getElementsByTagName('input')[0].value;
            let password = document.getElementById('login-form').getElementsByTagName('input')[1].value;
            getUsers();
            loginUser(email, password);
        })
    }
})

locationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    getPlacesByQuery();
})
