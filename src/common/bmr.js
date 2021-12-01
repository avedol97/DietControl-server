
//

// 1,0 – leżący lub siedzący tryb życia, brak aktywności fizycznej
// 1,2 – praca siedząca, aktywność fizyczna na niskim poziomie
// 1,4 – praca nie fizyczna, trening 2 razy w tygodniu
// 1,6 – lekka praca fizyczna, trening 3-4 razy w tygodniu
// 1,8 – praca fizyczna, trening 5 razy w tygodniu
// 2,0 – ciężka praca fizyczna, codzienny trening

//masa
// Ektomorfik:  [C] + 20% x [C]
// Mezomorfik: [C] +15% x [C]
// Endomorfik: [C] + 10% x [C]

//redukcja
// Ektomorfik:   [C] – 10% [C]
// Mezomorfik: [C] – 15% [C]
// Endomorfik:  [C] – 20% [C]


//https://www.budujmase.pl/diety/o-dietach/6297-obliczanie-wymaganej-ilosci-kalorii-krok-po-kroku.html

function getAge(dateString) {
    const day = new Date().getDay();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    let age = year-dateString["year"];
    if(dateString["month"]-1<month || (dateString["month"]-1===month&& dateString["day"]<=day)){
        return age
    }else{
        return  --age;
    }
}

let BMR = 0;

const estimateBmr = function(gender,dateOfBirth,height,weight,activity){
    console.log(getAge(dateOfBirth));
    if(gender === "Men" ){
        BMR = (66.5 + (13.7 * weight) + (5 * height) - (6.8 * getAge(dateOfBirth)))*activity;
    }else if(gender === "Woman"){
        BMR = (655 + (9.6  * weight) + (1.85 * height) - (4.7 * getAge(dateOfBirth)))*activity;
    }else {
        console.log("Problem with gender")
    }
    return BMR;
}

module.exports = {estimateBmr : estimateBmr};
