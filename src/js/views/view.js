import icons from 'url:../../img/icons.svg'; // in parcel 2 we have to specify  (url:) for images or etc ....

//This is the class parent
export default class view {
  _data;

  /**
   * Render the received object to the DOM
   * @param { Object | object[]} data the data to be rendered (e.g. recipe)
   * @param { Boolean} [render = true] if false, create markUp string instead of rendering it to the DOM
   * @returns {Undefined | string} A markUp string is returned if render=false
   * @this {Object} View instance
   * @author Cristian camilo
   * @todo finish the implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();

    this._data = data;
    const markUp = this._generateMarkup();

    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markUp);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup();
    // console.log(newMarkUp);
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDom.querySelectorAll(`*`));
    const curElement = Array.from(this._parentElement.querySelectorAll(`*`));

    newElements.forEach((newEl, i) => {
      const curEle = curElement[i];
      // console.log(newEl, newEl.isEqualNode(curEle));

      // Update changed text
      if (
        !newEl.isEqualNode(curEle) &&
        newEl.firstChild?.nodeValue.trim() !== ``
      ) {
        // console.log(`💥💥💥`, newEl.firstChild?.nodeValue.trim());
        curEle.textContent = newEl.textContent;
      }
      // Since the past conditions only allow aus to change nodes taht contains strings ... now se need to
      // update the nodes and its attributes... in this case the buttons' attributes.

      //  Update changed attributes ....

      if (!newEl.isEqualNode(curEle)) {
        // console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attri => {
          curEle.setAttribute(attri.name, attri.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = ``;
  }

  renderSpinner = function () {
    const markUp = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markUp);
  };

  renderHandlerRecipe(handler) {
    //  we can also listen for an event when the page loads
    // window.addEventListener(`load`, controlRecipes);  //We can linsten to the # event that happens on the url.
    [`hashchange`, `load`].forEach(ev => window.addEventListener(ev, handler));
  }

  renderErrorMessage(message = this._errorMessage) {
    const markUp = `
            <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `
            <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markUp);
  }
}
