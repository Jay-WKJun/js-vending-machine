import { productManagerViewInitiator } from './views/productManagerView.js';
import { vendingMachineManagerViewInitiator } from './views/vendingMachineManagerView.js';

import { productManagerController, productInventoryContainerController } from './components/productManagerComponent/index.js';
import { vendingMachineControllerComponent, cashBoxComponent } from './components/vendingMachineManagerComponent/index.js';

import { binders, createBinder } from './binders.js';

const $app = document.getElementById('app');
const $productManageMenu = document.getElementById('product-manage-menu');
const $vendingMachineManageMenu = document.getElementById('vending-machine-manage-menu');
const $productPurchaseMenu = document.getElementById('product-purchase-menu');

$productManageMenu.addEventListener('click', () => {
  const {
    productContainerView,
    productInventoryContainerView,
  } = productManagerViewInitiator($app);

  binders.productContainerBinder = createBinder(productContainerView, productManagerController);
  binders.productInventoryContainerBinder = createBinder(productInventoryContainerView, productInventoryContainerController);
});

$vendingMachineManageMenu.addEventListener('click', () => {
  const {
    vendingMachineControllerView,
    cashBoxView,
  } = vendingMachineManagerViewInitiator($app);

  binders.vendingMachineControllerBinder = createBinder(vendingMachineControllerView, vendingMachineControllerComponent);
  binders.cashBoxBinder = createBinder(cashBoxView, cashBoxComponent);
});

$productPurchaseMenu.addEventListener('click', () => {
  // TODO: part2에서 구현 예정
});
