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
