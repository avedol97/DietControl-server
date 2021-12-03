class Detail {
    constructor(id, gender, dateOfBirth, height, weight, activity, type,kcalUserBalance) {
        this._id = id;
        this._gender = gender;
        this._dateOfBirth = dateOfBirth;
        this._height = height;
        this._weight = weight;
        this._activity = activity;
        this._type = type;
        this._kcalUserBalance = kcalUserBalance;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._gender = value;
    }

    get dateOfBirth() {
        return this._dateOfBirth;
    }

    set dateOfBirth(value) {
        this._dateOfBirth = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get weight() {
        return this._weight;
    }

    set weight(value) {
        this._weight = value;
    }

    get activity() {
        return this._activity;
    }

    set activity(value) {
        this._activity = value;
    }

    get kcalUserBalance() {
        return this._kcalUserBalance;
    }

    set kcalUserBalance(value) {
        this._kcalUserBalance = value;
    }


    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }



}
module.exports = Detail;
