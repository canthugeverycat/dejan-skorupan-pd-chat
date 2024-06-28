import { makeAutoObservable } from 'mobx';

/**
 * A TextInput MobX form
 */
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

  /**
   * Returns the values usable by the component
   */
  get toInput() {
    return { value: this.value, onChange: this.onChange };
  }
}
