let binder = {};

class Binder {
  view = null;

  constructor(view) {
    this.view = view;
  }

  #applyViewModelInElements(viewModels, view) {
    // 여기가 viewModel의 이름에 해당하는 것들을 적용하는 곳.
    for (const key of viewModels) {
      
    }
  }

  render(viewModels) {
    this.view.render();
  }
}

export function createBinder(views) {
  // 처음 View와 Binder가 만나는 곳
  // View의 name에 해당하는 binder가 만들어짐
  const newBinder = {};
  views.map((view) => {
    newBinder[name] = new Binder(view);
  });
}
