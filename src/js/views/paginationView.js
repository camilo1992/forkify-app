import icons from 'url:../../img/icons.svg'; // in parcel 2 we have to specify  (url:) for images or etc ....
import view from './view.js';

class Pagination extends view {
  _parentElement = document.querySelector(`.pagination`);

  addHandlerClick(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const button = e.target.closest(`.btn--inline`);
      if (!button) return;

      const gotoPage = +button.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
             </svg>
    </button>`;
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return `
       <button data-goto="${
         currentPage - 1
       }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>`;
    }

    // Page 1 and there are NOT other pages
    if (currentPage === numPages && numPages === 1) {
      return ``;
    }

    // Other pages
    return `
    <button data-goto="${
      currentPage + 1
    }"class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
           </svg>
    </button>
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
    `;
  }
}

export default new Pagination();
