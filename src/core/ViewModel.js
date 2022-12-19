// 하나의 Element에 대한 정보를 담는다.
// 기본적으로 DOM과 같은 Tree 구조.
export class ViewModel {
  // element 이름, 이것으로 View에서 실제 Element를 특정한다
  name = '';
  styles = {};
  attributes = {};
  events = {};

  constructor(data) {
    if (typeof data !== 'object') {
      throw new Error('ViewModel constructor must have one Object as parameter');
    }

    Object.entries(data).forEach(([key, val]) => {
      switch(key) {
        case ('attributes'): {
          this.attributes = attributes;
          break;
        }
        case ('events'): {
          this.events = events;
          break;
        }
        case ('styles'): {
          this.styles = val;
          break;
        }
        default: {
          this[key] = val;
        }
      }
    });
  }
}
