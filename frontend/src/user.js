let allUsers = [];
let currentUser;
let previousUser = false;

class User {
    constructor(id, email) {
        this.id = id;
        this.email = email;
    }

    static findUser(email) {
        return (allUsers.find(obj => {return obj.email === email}));
    }

    static createRailsUserModel() {
        const email = inputs[0].value;
        const user = User.findUser(email);
        const pass = inputs[1].value;
        userModel = new User(email, pass);
    }
}

