import { productList } from "../Model/productManager/ProductList";
import { ViewModel } from "../core/ViewModel";

export function createProductManagerViewModel(list) {
  // Model을 받아서 가공한 다음 ViewModel을 return 한다.
  // 그럴려면 항상 Model이 변해야 한다.
  // 그리고 Model이 변하면 ViewModel에게 항상 알려야한다.
  // ViewModel이 변하면 Binder를 통해 View에까지 render되어야한다.

  // binder는 View에 종속적이다.
  // 그렇게 되지 않으려면, 실행시에 View와 ViewModel을 동시에
  // mapping해서 실행할 곳이 필요하다.

  // ViewModel이 새로 만들어지면 binder또한 같이 실행되야 한다.

  // 이렇게 되면 viewModel은 view를 알게 된다.
  // 그렇지만, view가 변경된다고 해서 viewModel이 변경되는 건 아니니, 괜찮은 것 같다.

  // 결합도를 줄이는 것은 어떤 변경이 있을 때, 변경을 최소화하는 것.
  // 그것에 적합한 것 같다.

  // VM interface, el이면 새로운 element, styles면 style, attribute면 HTML 속성들, 이런식으로 전달하면 충분할 것 같다.

  // new ViewModel을 담아서 넘기면 되지 ㅇㅇ

  // 일단 하나에 전부 다하고 리팩토링하자.
  return (new ViewModel('rootElement', {
    productContainer: {
      productNameInput: new ViewModel({}),
      productPriceInput: new ViewModel({}),
      productQuantityInput: new ViewModel({}),
      productAddButton: new ViewModel({
        events: {
          onClick: () => {
            console.log('click button');
          }
        }
      }),
    },
    productInventory: {
      productInventoryContainer: new ViewModel({
        children: productList.map(({ name, price, amount }) => {
          const productNameRow = new ViewModel({ attributes: { textContent: name } });
          const productPriceRow = new ViewModel({ attributes: { textContent: price } });
          const productAmountRow = new ViewModel({ attributes: { textContent: amount } });

          return ({
            productNameRow,
            productPriceRow,
            productAmountRow,
          });
        }),
      }),
    }
  }));
}
