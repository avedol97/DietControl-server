class User {
    constructor(id,email, password, token, maxAge) {
        this._id = id;
        this._email = email;
        this._password = password;
        this._token = token;
        this._maxAge = maxAge;
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

