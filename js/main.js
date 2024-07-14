/*
///<reference types = "../@types/jquery"/>

/*
* Search meal by name
www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

* List all meals by first letter
www.themealdb.com/api/json/v1/1/search.php?f=a

* Lookup full meal details by id
www.themealdb.com/api/json/v1/1/lookup.php?i=52772

* Lookup a single random meal
www.themealdb.com/api/json/v1/1/random.php

* List all meal categories
www.themealdb.com/api/json/v1/1/categories.php

* List all Categories, Area, Ingredients
www.themealdb.com/api/json/v1/1/list.php?c=list
www.themealdb.com/api/json/v1/1/list.php?a=list
www.themealdb.com/api/json/v1/1/list.php?i=list

* Filter by main ingredient
www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

* Filter by Category
www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

* Filter by Area
www.themealdb.com/api/json/v1/1/filter.php?a=Canadian


* Images
Meal Thumbnail Images
Add /preview to the end of the meal image URL
/images/media/meals/llcbn01574260722.jpg/preview

* Ingredient Thumbnail Images
www.themealdb.com/images/ingredients/Lime.png
www.themealdb.com/images/ingredients/Lime-Small.png
*/


//~ ==================> Aside
$('aside .blackNav ul li').eq(0).on('click', function (e) {
    $('#searchٍSection').removeClass('d-none')
    // categories()  

    /*
    * Search meal by name
        www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

    * List all meals by first letter
      www.themealdb.com/api/json/v1/1/search.php?f=a
     */
$('#searchSection input').eq(0).on('input',function(e){
    console.log(e.target)
})



async function search(w,q) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${w}=${q}`)
        let finalResponse = await response.json()
        displayMealDescription(finalResponse)
    } catch (error) {
        console.log(error);
    }
}



})





//? =======================> Meal description section 
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772
async function mealDescription(mealID) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        let finalResponse = await response.json()
        displayMealDescription(finalResponse)
    } catch (error) {
        console.log(error);
    }
}

//^ ================>>mealDescription()
function displayMealDescription(data) {
    let meals = data.meals[0]
    console.log(meals)
    let dataRepete = ``
    let dataNoRepet = ` <div class="row py-5 g-4 text-white">
        <div class="col-md-4">
            <img src="${meals.strMealThumb}" class="w-100 rounded-3" alt="">
            <h2 class="mt-3 fw-bolder">${meals.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2 class="fw-bolder">Instructions</h2>
            <p>${meals.strInstructions}</p>
            <h3><span class="fw-bolder">Area :</span> ${meals.strArea}</h3>
            <h3><span class="fw-bolder">Category :</span> ${meals.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="recipes list-unstyled d-flex g-3 flex-wrap">
           </ul>
            <h3>Tags :</h3>
            <ul class="mealTag list-unstyled d-flex g-3 flex-wrap">
            </ul>
           <a target="_blank" class="btn btn-success" href="${meals.strSource}">Source</a>
           <a target="_blank" class="btn btn-danger" href="${meals.strYoutube}">Youtube</a>
        </div>
    
    </div>   `


    for (let i = 1; i < 21; i++) {
        let property1 = `strMeasure${i}`
        let property2 = `strIngredient${i}`
        const measure = meals[property1]
        const ingredient = meals[property2]
        if (measure) {
            dataRepete += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`
        }
    }

    let strTag = meals.strTags
    let tagArray = strTag.split(',')
    let tagBox = ``
    for (let i = 0; i < tagArray.length; i++) {
        tagBox += `
        <li class="alert alert-danger m-2 p-1">${tagArray[i]}</li> `
    }

    $("#mealDesc").html(dataNoRepet)
    $('.recipes').html(dataRepete)
    $('.mealTag').html(tagBox)

}


//? ==========>Home display data from API
// https://www.themealdb.com/api/json/v1/1/search.php?s=

async function getHomeData() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        let finalResponse = await response.json()
        displayHomeData(finalResponse)
    } catch (error) {
        console.log(error);
    }
}
// getHomeData()
function displayHomeData(data) {
    let meals = data.meals.slice(0, 20)
    console.log(meals);
    let dataBox = ` `

    for (let i = 0; i < 20; i++) {

        dataBox += `
        <div data-id'${meals[i].idMeal}' class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-3">
                    <img src="${meals[i].strMealThumb}" style="width:100%;" alt=""    >
                    <div class="meal-layer position-absolute bg-white bg-opacity-75 d-flex fw-bolder align-items-center">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    }
    $("#displayHomeData").html(dataBox)


     //* =====>  Filter by Category

     $('.col-md-3').on('click', function (e) {
        let filterCategory = e.currentTarget.dataset.id;
        console.log(filterCategory)
        // displayMealDescription("c", filterCategory)
        // $('#categorySection').addClass('d-none')
    })
}



//? List all meal categories
//www.themealdb.com/api/json/v1/1/categories.php

async function categories() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        console.log(response)
        let finalResponse = await response.json()
        console.log(finalResponse);
        displayCategories(finalResponse)
    } catch (error) {
        console.log(error);
    }
}
categories()
function displayCategories(data) {
    let category = data.categories
    console.log(category)
    let dataBox = ` `

    for (let i = 0; i < category.length; i++) {

        dataBox += `
       <div data-id='${category[i].strCategory}' class="col-md-3">
            <div id="mealCategory" class="meal position-relative overflow-hidden rounded-3">
                <img src="${category[i].strCategoryThumb}" style="width:100%;" alt=""    >
                <div class="meal-layer position-absolute bg-white bg-opacity-75 d-flex fw-bolder align-items-center flex-column ">
                    <h3>${category[i].strCategory}</h3>
                    <p class="text-center">${category[i].strCategoryDescription}</p>
                </div>
            </div>
        </div>`
    }
    $("#displayCategories").html(dataBox)

    //* =====>  Filter by Category

    $('.col-md-3').on('click', function (e) {
        let filterCategory = e.currentTarget.dataset.id;
        filterFunction("c", filterCategory)
        $('#categorySection').addClass('d-none')
    })
}



//~ =======================> filter function ================
async function filterFunction(by, filter) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${by}=${filter}`)
        console.log(response)
        let finalResponse = await response.json()
        console.log(finalResponse);
        displayHomeData(finalResponse)
    } catch (error) {
        console.log(error);
    }
}







//? ================> List all Area
//https://www.themealdb.com/api/json/v1/1/list.php?a=list

async function area() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        console.log(response)
        let finalResponse = await response.json()
        console.log(finalResponse);
        displayArea(finalResponse)
    } catch (error) {
        console.log(error);
    }
}
// area()
function displayArea(data) {
    let area = data.meals
    console.log(area)
    let dataBox = ` `

    for (let i = 0; i < area.length; i++) {
        dataBox += `
        <div data-id='${area[i].strArea}' class="col-md-3 pointer">
        <div class="area d-flex justify-content-center align-items-center flex-column text-white">
           <i class="fa-solid fa-house-laptop fa-4x"></i>
           <h3 class="fs-1">${area[i].strArea}</h3>
        </div>
    </div>
    `
    }

    $("#displayArea").html(dataBox)


    //* =====>  Filter by Area

    $('.col-md-3').on('click', function (e) {
        let filterArea = e.currentTarget.dataset.id;
        // console.log(filterArea)
        filterFunction("a", filterArea)
        $('#areaSection').addClass('d-none')
    })
}


//? ================> List all Ingredients
//https://www.themealdb.com/api/json/v1/1/list.php?i=list

async function Ingredients() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        console.log(response)
        let finalResponse = await response.json()
        console.log(finalResponse);
        displayIngredients(finalResponse)
    } catch (error) {
        console.log(error);
    }
}
// Ingredients()
function displayIngredients(data) {
    let Ingredients = data.meals
    console.log(Ingredients)
    let dataBox = ` `

    for (let i = 0; i < 25; i++) {
        dataBox += `
         <div data-id='${Ingredients[i].strIngredient}' class="col-md-3 pointer">
            <div class="area d-flex justify-content-center align-items-center flex-column text-white">
               <i class="fa-solid fa-drumstick-bite fa-4x"></i>
               <h3 class="fs-1 text-center">${Ingredients[i].strIngredient}</h3>
               <p class="text-center">${limitationWord(Ingredients[i].strDescription)}</p>
            </div>
        </div>
    `
    }
    $("#displayIngredients").html(dataBox)

    //* =====>  Filter by Ingredients

    $('.col-md-3').on('click', function (e) {
        let filterIngredients = e.currentTarget.dataset.id;
        console.log(filterIngredients)

        // let filterKey= concatForSearch(filterIngredients)
        // console.log(filterKey)
        filterFunction("i", filterIngredients)
        $('#ingredientsSection').addClass('d-none')
    })


    //& ================ for filter syntax
    function concatForSearch(oldText) {
        const newText = oldText.split(' ').join('_')
        return newText
    }
}


//& ================ function cut 20 word only from pragraph
function limitationWord(oldText) {
    const newText = oldText.split(' ').slice(0, 20).join(' ')
    return newText
}

// * ===========> side navbar animation
$("#openAside").on('click', function () {
    $(".blackNav").animate({ width: 'toggle', paddingInline: 'toggle' }, 1000);
    $("#openAside").toggleClass("fa-xmark");
});



// * ==================> Contact Us =============================

// ^===================> Regex ==================
const usernameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^01\d{9}$/;
const ageRegex = /^(?:1[01][0-9]|110|[1-9]?[0-9])$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// ^===================> input data ==================
const userName = document.getElementById('nameInput')
const userEmail = document.getElementById('emailInput')
const userPhone = document.getElementById('phoneInput')
const userAge = document.getElementById('ageInput')
const userPassword = document.getElementById('passwordInput')
const userRepassword = document.getElementById('repasswordInput')
const submitBtn = document.getElementById('submitBtn')

// ^===================> alert div ==================
const nameAlert = document.getElementById('nameAlert')
const emailAlert = document.getElementById('emailAlert')
const phoneAlert = document.getElementById('phoneAlert')
const ageAlert = document.getElementById('ageAlert')
const passwordAlert = document.getElementById('passwordAlert')
const repasswordAlert = document.getElementById('repasswordAlert')



// ^===================> Check Validation ==================

userName.addEventListener('input', function () {
    userNameValidation(userName, usernameRegex, nameAlert)
})

userEmail.addEventListener('input', function () {
    userNameValidation(userEmail, emailRegex, emailAlert)
})

userPhone.addEventListener('input', function () {
    userNameValidation(userPhone, phoneRegex, phoneAlert)
})

userAge.addEventListener('input', function () {
    userNameValidation(userAge, ageRegex, ageAlert)
})

userPassword.addEventListener('input', function () {
    userNameValidation(userPassword, passwordRegex, passwordAlert)
})

userRepassword.addEventListener('input', function () {
    test()
})

$('.inputHolder').on('input', function () {
    if (
        userNameValidation(userName, usernameRegex, nameAlert) &&
        userNameValidation(userEmail, emailRegex, emailAlert) &&
        userNameValidation(userPhone, phoneRegex, phoneAlert) &&
        userNameValidation(userAge, ageRegex, ageAlert) &&
        userNameValidation(userPassword, passwordRegex, passwordAlert) &&
        test()
    ) {
        console.log('hi')
        submitBtn.removeAttribute('disabled')
    } else {
        console.log('bye')
        submitBtn.setAttribute('disabled', true)
    }
})


function userNameValidation(inputName, pattern, alertName) {
    console.log(inputName.value)
    if (pattern.test(inputName.value)) {
        alertName.classList.add('d-none')
        // console.log(uesrEntry)
        return true
    } else {
        alertName.classList.remove('d-none')
        return false
    }
}

function test() {
    if (userPassword?.value === userRepassword?.value) {
        repasswordAlert.classList.add('d-none')
        return true
    } else {
        repasswordAlert.classList.remove('d-none')
        return false
    }
}





