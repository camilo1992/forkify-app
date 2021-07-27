import icons from 'url:../../img/icons.svg'; // in parcel 2 we have to specify  (url:) for images or etc ....
import view from './view.js';

class AddRecipeView extends view {
  _parentElement = document.querySelector(`.upload`);
  _message = `Recipe was successfully uploaded :)`;

  _window = document.querySelector(`.add-recipe-window`);
  _overlay = document.querySelector(`.overlay`);
  _btnOpen = document.querySelector(`.nav__btn--add-recipe`);
  _btnClose = document.querySelector(`.btn--close-modal`);

  constructor() {
    // We are calling this two events here because. this are not related with the controller...
    super();
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle(`hidden`);
    this._window.classList.toggle(`hidden`);
  }

  addHandlerShowWindow() {
    this._btnOpen.addEventListener(`click`, this.toggleWindow.bind(this));
  }

  addHandlerHideWindow() {
    this._btnClose.addEventListener(`click`, this.toggleWindow.bind(this));
    this._overlay.addEventListener(`click`, this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // New formdata , is a modaern browser API. wwe have to pass the form in this case the this key word
      const data = Object.fromEntries(dataArr); // Object.fromEntries was introduced in ES19 as a way of transfoming entries into objects
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
