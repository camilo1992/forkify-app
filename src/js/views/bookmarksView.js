import icons from 'url:../../img/icons.svg'; // in parcel 2 we have to specify  (url:) for images or etc ....
import view from './view.js';
import PreviewView from './previewView.js';

class BookmarksView extends view {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = `There is not a  bookmarked recipe yet. Go and find a nice recipe and book mark it !!!`;
  _message = ``;

  addHAndlerRender(handler) {
    window.addEventListener(`load`, handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join(``);
  }
}

export default new BookmarksView();
