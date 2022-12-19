import { renderProductManager } from './components/productManager.js';
import { getProductPurchaseHTML } from './components/productPurchase.js';
import { getVendingMachineManageMenuHTML } from './components/vendingMachineManageMenu.js';
import { View } from './core/View.js';

import { entryObject } from './utils/utils.js';

const $app = document.getElementById('app');
const $productManageMenu = document.getElementById('product-manage-menu');
const $vendingMachineManageMenu = document.getElementById('vending-machine-manage-menu');
const $productPurchaseMenu = document.getElementById('product-purchase-menu');

$productManageMenu.addEventListener('click', () => {
  // TODO: 첫 렌더시에 관련된 state들 추가해야 함.
  const reactiveElements = renderProductManager($app)
    .getReactiveElements();

  const views = entryObject(reactiveElements).map(([key, val]) => {
    return new View(key, val);
  });
});

$vendingMachineManageMenu.addEventListener('click', () => {
  $app.innerHTML = getVendingMachineManageMenuHTML();
});

$productPurchaseMenu.addEventListener('click', () => {
  $app.innerHTML = getProductPurchaseHTML();
});
