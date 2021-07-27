import icons from 'url:../../img/icons.svg'; // in parcel 2 we have to specify  (url:) for images or etc ....
import view from './view.js';
import PreviewView from './previewView.js';

class ResultsView extends view {
  _parentElement = document.querySelector(`.results`);
  _errorMessage = `Sorry, Theres is not recipe that matches your query. Please try again!!!`;
  _message = ``;

  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join(``);
  }
}

export default new ResultsView();
