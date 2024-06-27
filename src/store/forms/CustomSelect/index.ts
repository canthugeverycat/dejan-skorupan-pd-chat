import { makeAutoObservable } from 'mobx';

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

  get toInput() {
    return { value: this.value, onClick: this.onClick };
  }
}
