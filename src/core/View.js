import { mapObjectValues } from "../utils/utils";

export class View {
  name = '';
  #rootElement = null;
  #reactiveChildElements = {};
  reactiveElements = [];

  constructor(name, rootElement, reactiveChildElements) {
    this.name = name;
    this.#rootElement = rootElement;
    this.#reactiveChildElements = reactiveChildElements;
    this.reactiveElements = this.#getElementsWithSelectors();

    Object.seal(this);
  }

  #getElementsWithSelectors() {
    return mapObjectValues(this.#reactiveChildElements, (selector) => {
      const selectedElement = this.#rootElement.querySelector(selector);
      if (!selectedElement) throw new Error(`selector : ${selector} is not exist in ${name}`);

      return selectedElement;
    });
  }

  // TODO: 완전히 완성된 HTMLElement 덩어리가 와야한다.
  render(rootElement) {
    this.#rootElement.replaceWith(rootElement);
    this.reactiveElements = this.#getElementsWithSelectors();
  };
}
