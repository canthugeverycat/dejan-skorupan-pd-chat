import { makeAutoObservable } from 'mobx';

export class TextInput {
  constructor(public value = '') {
    makeAutoObservable(this);
  }

  private onChange = (e: { currentTarget: { value: string } }) => {
    this.value = e.currentTarget.value;
  };

  setValue = (value: string) => {
    this.value = value;
  };

  get toInput() {
    return { value: this.value, onChange: this.onChange };
  }
}
