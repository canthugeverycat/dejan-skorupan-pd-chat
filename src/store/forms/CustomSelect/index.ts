import { makeAutoObservable } from 'mobx';

/**
 * A select MobX form
 */
export class CustomSelect {
  constructor(public value = -1) {
    makeAutoObservable(this);
  }

  private onClick = (value: number) => {
    this.value = value;
  };

  setValue = (value: number) => {
    this.value = value;
  };

  /**
   * Returns the values usable by the component
   */
  get toInput() {
    return { value: this.value, onClick: this.onClick };
  }
}
