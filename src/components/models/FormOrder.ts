import { Model } from '../base/Component';
import { IFormOrder, IProductCard, IFormErrors } from "../../types";

export class FormOrder extends Model<IFormOrder> {
  protected _payment = '';
  protected _address = '';
  protected _email = '';
  protected _phone = '';
  protected _formErrors: IFormErrors = {};
  protected _items: IProductCard[];
  validateOrder(): void {
    this.validatePayMethod();
    this.validateAddres();
    this.validateEmail();
    this.validatePhone();
    this.emitChanges('formErrors:changed', this._formErrors);
  }

  clearOrder() {
    this._payment = '';
    this._address = '';
    this._email = '';
    this._phone = '';
    this.emitChanges('formErrors:changed', this._formErrors)
  }

  set items(value: IProductCard[]) {
    this._items = value;
  }

  set payment(value: string) {
    this._payment = value;
    this.validateOrder();
  }

  set email(value: string) {
    this._email = value.toLowerCase();
    this.validateOrder();
  }

  set address(value: string) {
    this._address = value;
    this.validateOrder();
  }

  set phone(value: string) {
    this._phone = value;
    this.validateOrder();
  }

  get items() {
    return this._items;
  }

  get payment() {
    return this._payment;
  }

  get email() {
    return this._email;
  }

  get address() {
    return this._address;
  }

  get phone() {
    return this._phone;
  }

  validatePayMethod(): void {
    if (!this._payment) {
      this._formErrors.payment = 'Необходимо выбрать способ оплаты';
    } else {
      this._formErrors.payment = '';
    }
    this.emitChanges('formErrors:changed', this._formErrors);
  }

  validateAddres(): void {
    if (!this._address) {
      this._formErrors.address = 'Необходимо ввести адрес доставки';
    } else {
      this._formErrors.address = '';
    }
    this.emitChanges('formErrors:changed', this._formErrors);
  }

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!this._email) {
      this._formErrors.email = 'Необходимо ввести почту';
    }
    else if (!emailRegex.test(this._email)) {
      this._formErrors.email = 'Некорректная почта';
    }
    else {
      this._formErrors.email = '';
    }
    this.emitChanges('formErrors:changed', this._formErrors);
  }

  validatePhone(): void {
    if (!this._phone) {
      this._formErrors.phone = 'Необходимо ввести телефон';
    } else {
      this._formErrors.phone = '';
    }
    this.emitChanges('formErrors:changed', this._formErrors);
  }

  get formErrors(): IFormErrors {
    return this._formErrors;
  }

  postOrder(): void {
    this.clearOrder();
    this.emitChanges('order:post');
  }
}