export function renderProductManager(rootElement) {
  rootElement.innerHTML = getProductManagerHTML();

  return {
    getReactiveElements: () => ({
      productContainer: {
        rootElement: document.getElementById('product-container'),
        reactiveChildren: {
          productNameInput: document.getElementById('product-name-input'),
          productPriceInput: document.getElementById('product-price-input'),
          productQuantityInput: document.getElementById('product-quantity-input'),
          productAddButton: document.getElementById('product-add-button'),
        }
      },
      productInventoryContainer: {
        rootElement: document.getElementById('product-inventory-container'),
        reactiveChildren: {}
      }
    }),
  };
}

export function getProductManagerHTML() {
  return (`
    <h3>상품 추가하기</h3>
    <div class="product-container" id="product-container">
      <input type="text" id="product-name-input" placeholder="상품명" />
      <input type="number" id="product-price-input" placeholder="가격" />
      <input type="number" id="product-quantity-input" placeholder="수량" />
      <button id="product-add-button">추가하기</button>
    </div>
    <table class="product-inventory">
      <colgroup>
        <col style="width: 140px" />
        <col style="width: 100px" />
        <col style="width: 100px" />
      </colgroup>
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
        </tr>
      </thead>
      <tbody id="product-inventory-container"></tbody>
    </table>
  `);
}
