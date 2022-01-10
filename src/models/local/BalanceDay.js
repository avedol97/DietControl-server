class BalanceDay {
    constructor(idUser, idProduct, date, protein, fat, carbohydrates, kcalToday,weight) {
        this._idUser = idUser;
        this._idProduct = idProduct;
        this._date = date;
        this._protein = protein;
        this._fat = fat;
        this._carbohydrates = carbohydrates;
        this._kcalToday = kcalToday;
        this._weight = weight;
    }
    get idUser() {
        return this._idUser;
    }

    set idUser(value) {
        this._idUser = value;
    }

    get idProduct() {
        return this._idProduct;
    }

    set idProduct(value) {
        this._idProduct = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get protein() {
        return this._protein;
    }

    set protein(value) {
        this._protein = value;
    }

    get fat() {
        return this._fat;
    }

    set fat(value) {
        this._fat = value;
    }

    get carbohydrates() {
        return this._carbohydrates;
    }

    set carbohydrates(value) {
        this._carbohydrates = value;
    }

    get kcalToday() {
        return this._kcalToday;
    }

    set kcalToday(value) {
        this._kcalToday = value;
    }

}

module.exports = BalanceDay;
