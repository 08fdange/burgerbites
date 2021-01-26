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

    displayPlace(ul) {
        const li = document.createElement('li');
        li.className = 'place-li-item';
        const div = document.createElement('div');
        div.className = 'place-div';
        const formDiv = document.createElement('div');
        formDiv.className = 'rating-form-div';
        formDiv.dataset.place = this.name;
        const img = document.createElement('img');
        img.src = this.img;
        img.className = 'place-image';
        const h1 = document.createElement('h1');
        h1.innerText = this.name;
        const a = document.createElement('a');
        a.className = 'phone-number';
        a.href = `tel:${this.phone}`;
        a.innerHTML += '<br>';
        a.innerText = this.phone;
        a.innerHTML += '<br>'
        const a2 = document.createElement('a');
        a2.className = 'place-url'
        a2.href = this.url;
        a2.innerText = 'URL';
        a2.innerHTML += '<br>';
        let starsDiv = document.createElement('div');
        starsDiv.id = this.name;
        const starsOuter = document.createElement('div');
        starsOuter.className = 'stars-outer';
        const starsInner = document.createElement('div');
        starsInner.className = 'stars-inner';
        const ratingButton = document.createElement('button');
        ratingButton.className = 'rating-dropdown-button';
        ratingButton.textContent = 'Rate';

        //append elements
        div.appendChild(h1);
        div.appendChild(starsDiv);
        starsDiv.appendChild(starsOuter);
        starsOuter.appendChild(starsInner);
        div.appendChild(formDiv);
        formDiv.appendChild(ratingButton);
        div.innerHTML += '<br>';
        div.appendChild(a);
        div.appendChild(a2);
        div.appendChild(img);
        li.appendChild(div);
        ul.appendChild(li);

        

    }

    static aToZ() {
        allPlaces.sort(function(a, b){
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if(nameA < nameB) {
                return -1
            }

            return 0;
        })
    }

}