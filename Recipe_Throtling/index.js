let root = document.querySelector(".root");
let userInput = document.querySelector("#user_input");
let recipeNotFound = document.querySelector(".recipeNotFound");


  userInput.addEventListener("input", ()=>{
    let value1 = userInput.value;
    let isRecipe = false;
    if(isRecipe === false){
        searchRecipe(value1);
        setTimeout(()=>{
            isRecipe = false;
        }, 300)
    }
  })


let searchRecipe = async (singleRecipe)=>{
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${singleRecipe}`);
        let data = await res.json();
         displayRecipe(data.meals)
        // console.log(data)
    } catch (error) {
        console.log("Data not Found", error)
    }
}


function displayRecipe(recipe){
    root.innerHTML = "";
    recipeNotFound.innerHTML = "";

    if(!recipe || recipe.length === 0){
      let notFound = document.createElement("p");
    notFound.textContent = "Please enter valid Dishe Name";
    notFound.setAttribute("class", "notFound")

    recipeNotFound.append(notFound);
    }
   recipe.forEach(ele =>{
    let card = document.createElement("div");
      card.setAttribute("class", "card");
      let recipeImg = document.createElement("img");
      recipeImg.src = ele.strMealThumb;
      let recipeTitle = document.createElement("h2");
      recipeTitle.textContent = ele.strMeal;
      let recipeCategry = document.createElement("p");
      recipeCategry.textContent = `Category: ${ele.strCategory}`;
      let type = document.createElement("p");
      type.textContent = `Type: ${ele.strArea}`;
      let btn = document.createElement("a");
         btn.textContent = "For Recipe"
         btn.href = ele.strSource;

    card.append(recipeImg, recipeTitle, recipeCategry, type, btn);
      root.appendChild(card)
   })

}
