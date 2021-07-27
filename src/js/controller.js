`strict mode`;
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

/*
In parcel

we can import all kind of assests ...  
I need to import the icons form the img file since parcel is setting a path into the dist index.html file,
and this path does not lead to where the images are ....

*/
// import icons from '../img/icons.svg'; // in parcel 1

import 'core-js/stable';
import 'regenerator-runtime/runtime'; // this tow are just libraries taht are gonna help us run Asyncs and some array properties in old browsers

// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}

/////////////////////////////////////////////////////////////////////////////////

const controlRecipes = async function () {
  try {
    // 3. implmentation o the hashchange and load event..
    const id = window.location.hash.slice(1);

    if (!id) return;
    // 1.1 render spinner
    recipeView.renderSpinner();

    // 0. update results view to mark selected search result.
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1. Loading recipe
    await model.loadRecipe(id);

    //  2. Rendering recipe .....
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderErrorMessage(`${error} 🔥🔥🔥🔥🔥🔥`);
  }
};

//////////////////////////////////////////////////////////////////////////////////////
const controlSearchResults = async function () {
  // 1. Get serach query
  const query = searchView.getSerachResult();
  if (!query) return;

  // 2. Render spinner
  resultsView.renderSpinner();

  // 3. Fetch data and update state so that we can use the state to render results
  // this process tates place into the model
  await model.lowSearchRequest(query);

  // 4. Render serch Result.;
  resultsView.render(model.getSearchResultsPage(1));

  // 5. Render pagination buttons.
  paginationView.render(model.state.search);
};
/////////////////////////////////////////////////////////////////////////////////////////////////
const controlPagination = function (gotoPage) {
  // 4. Render serch Result.;
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 5. Render pagination buttons.
  paginationView.render(model.state.search);
};

/////////////////////////////////////////////////////////////////////////////////////////////////
const controlServings = function (newServings) {
  //  1. updates the new servibgs in the model
  model.updateServings(newServings);
  //  2. display new servings in the UI
  // In order to improve the rendering of a new serving without affecting the entire UI. we can create a virtual
  // DOm anc ocmpare it with the current one.So that only update wha has really changed.
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

/////////////////////////////////////////////////////////////////////////////////////////////////
const controlAddBookmarked = function () {
  // Add or delete a Bookmarked.....
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render recipe BookMarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //  Upload the new recipe data
    console.log(newRecipe);
    await model.upLoadREcipe(newRecipe);
    // console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change id in the url
    window.history.pushState(null, ``, `#${model.state.recipe.id}`);
    // Success message
    addRecipeView.renderMessage();

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
    addRecipeView.renderErrorMessage(error.message);
  }
};

const init = function () {
  bookmarksView.addHAndlerRender(controlBookmarks);
  recipeView.renderHandlerRecipe(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookMark(controlAddBookmarked);

  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
