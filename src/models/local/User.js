class User {
    constructor(id,email, password, token, maxAge,isAdmin, isDetails) {
        this._id = id;
        this._email = email;
        this._password = password;
        this._token = token;
        this._maxAge = maxAge;
        this._isAdmin = isAdmin;
        this._isDetails = isDetails;
    }


    get maxAge() {
        return this._maxAge;
    }

    set maxAge(value) {
        this._maxAge = value;
    }

    get isAdmin() {
        return this._isAdmin;
    }

    set isAdmin(value) {
        this._isAdmin = value;
    }

    get isDetails() {
        return this._isDetails;
    }

    set isDetails(value) {
        this._isDetails = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }
}

module.exports = User;
