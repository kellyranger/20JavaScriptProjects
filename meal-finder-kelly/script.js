const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

//Search Meal and fetch from API
function searchMeal(e){
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = '';

  //Get Search Term
  const term = search.value;

  //Check for empty
  if(term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`

      if(data.meals === null){
        resultHeading.innerHTML = `<p>There are no search results, try again</p>`
      } else {
        mealsEl.innerHTML = data.meals.map(meal => `
        <div class="meal">
          <img src="${meal.strMealThumb}" alt="strMeal"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
        </div>
        `)
        .join('');
      }
    } );
    //Clear Search Text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }

  // console.log(term);
}

//Event Listener
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    console.log(item);
  });
});