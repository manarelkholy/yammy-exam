
let sear=document.getElementById("Sear");
let Cat=document.getElementById("Cat");
let Area=document.getElementById("Area");
let Ingr=document.getElementById("Ingr");
let Cont=document.getElementById("Cont");
sear.addEventListener('click',function(){
    showSearchInputs(); closeSideNav();
});
Cat.addEventListener('click',function(){
    getArea(); getCategories(); closeSideNav();
})

Area.addEventListener('click',function(){
    closeSideNav();
})
Ingr.addEventListener('click',function(){
    getIngredients(); closeSideNav();
})
Cont.addEventListener('click',function(){
    showContacts(); closeSideNav(); 
})


let row = document.getElementById("row");

let arr=[];
function displayMeals(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                <div id="getMealDetails" onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    row.innerHTML = box; 
}

async function getCategories() {
    row.innerHTML = ""
    $(".inner-loading").fadeIn(500)
    search.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading").fadeOut(500)

}

function displayCategories(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                <div id="getCategoryMeals" onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    // let getCategoryMeals=document.getElementById('getCategoryMeals');
    // getCategoryMeals.addEventListener("click",function(){
    //     getCategoryMeals('${arr[i].strCategory}');

    // })

    row.innerHTML = box
}
let search = document.getElementById("search");

async function getArea() {
    row.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayArea(respone.meals)
    $(".inner-loading").fadeOut(500)

}


function displayArea(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                <div  id="getAreaMeals" onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center " >
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
 
   
    row.innerHTML = box
}


async function getIngredients() {
    row.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading").fadeOut(500)

}


function displayIngredients(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                <div  onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center" id="imgGetMeal" >
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
// let imgGetMeal=document.getElementById("imgGetMeal");
// imgGetMeal.addEventListener('click',function(){
//     getIngredientsMeals('${arr[i].strIngredient}')
// })


    row.innerHTML = box
}


async function getCategoryMeals(category) {
    row.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(500)

}
async function getAreaMeals(area) {
    row.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(500)

}


async function getIngredientsMeals(ingredients) {
    row.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(500)

}

async function getMealDetails(mealID) {
    closeSideNav()
    row.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading").fadeOut(500)

}


function displayMealDetails(meal) {

    search.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let box = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    row.innerHTML = box
}


function showSearchInputs() {
    search.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input id="searchByName"  onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input id="searchByFirstLetter"onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    row.innerHTML = ""
}

async function searchByName(term) {
    closeSideNav()
    row.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading").fadeOut(500)

}

async function searchByFirstLetter(term) {
    closeSideNav()
    row.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading").fadeOut(500)

}


function showContacts() {
    row.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class=" focus-ring-info form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class=" for form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `

  


    document.getElementById("nameInput").addEventListener("focus", () => { nameInput = true })

    document.getElementById("emailInput").addEventListener("focus", () => { emailInput = true })

    document.getElementById("phoneInput").addEventListener("focus", () => { phoneInput = true })

    document.getElementById("ageInput").addEventListener("focus", () => { ageInput = true })

    document.getElementById("passwordInput").addEventListener("focus", () => { passwordInput = true })

    document.getElementById("repasswordInput").addEventListener("focus", () => { repasswordInput = true })
}

let nameInput= false;
let emailInput= false;
let phoneInput= false;
let ageInput= false;
let passwordInput= false;
let repasswordInput= false;

function inputsValidation() {
    if (nameInput) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInput) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInput) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInput) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInput) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInput) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }
    let submitBtn = document.getElementById("submitBtn")

    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
       
        submitBtn.addEventListener('click',function(){
           clearForm();
          

        })
        

    } else {
       
    }
}


function clearForm(){
    document.getElementById('nameInput').value="";
    document.getElementById('emailInput').value="";
    document.getElementById('phoneInput').value="";
    document.getElementById('ageInput').value="";
    document.getElementById('passwordInput').value="";
    document.getElementById('repasswordInput').value="";

}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
   



$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

function openSideNav() {
    $(".side-nav").animate({ left: 0 }, 500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let Width = $(".side-nav .nav-tab").outerWidth()
    $(".side-nav").animate({ left: -Width }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({ top: 500 }, 500)
}

closeSideNav();
$(".side-nav i.open-close-icon").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        closeSideNav();
    } else {
        openSideNav();
    }
})

