let root = document.querySelector(".root");
let movieNotFound = document.querySelector(".movieNotFound");
let userInput = document.querySelector("#user_input");

let timer;
userInput.addEventListener("input", () =>{
  let query = userInput.value;
  clearTimeout(timer);
  timer = setTimeout(() =>{
    search_movies(query);
  }, 300)
})

async function search_movies(search) {
  let myApi = "8fbe97ea";
  let URL = `http://www.omdbapi.com/?apikey=${myApi}&s=${search}`;
  try {
    let res = await fetch(URL);
    let data = await res.json();

    displayMovie(data.Search);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

let displayMovie = (movieData) => {
  root.innerHTML = "";
  movieNotFound.innerHTML = "";
  if (!movieData || movieData.length === 0) {
    let notFound = document.createElement("p");
    notFound.textContent = "Please enter Movie Name";
    notFound.setAttribute("class", "notFound")

    movieNotFound.append(notFound);
  } else {
    movieData.forEach((element) => {
      let card = document.createElement("div");
      card.setAttribute("class", "card");
      let MovieIMg = document.createElement("img");
      MovieIMg.src = element.Poster;
      let MovieTitle = document.createElement("h2");
      MovieTitle.textContent = element.Title;
      let MovieType = document.createElement("p");
      MovieType.textContent = element.Type;
      let MovieYear = document.createElement("h3");
      MovieYear.textContent = element.Year;

      card.append(MovieIMg, MovieTitle, MovieType, MovieYear);

      root.append(card);
    });
  }
};
