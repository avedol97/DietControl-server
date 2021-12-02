class Product {
    constructor(name, category, protein, fat, carbohydrates, calories) {
        this._category = category;
        this._protein = protein;
        this._fat = fat;
        this._carbohydrates = carbohydrates;
        this._calories = calories;
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
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

    get calories() {
        return this._calories;
    }

    set calories(value) {
        this._calories = value;
    }
}



module.exports = Product;