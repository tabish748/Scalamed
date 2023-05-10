
import Utils from "../../libs/utils.js";

class RadioButton extends HTMLElement
{
  static tname = "radio-button";
  
  constructor() {
    super();
    this._label = document.createElement('label');
    this._label.className = 'custom__radio';

    this._input = document.createElement('input');
    this._input.type = 'radio';
    this._input.addEventListener('change', this._onChange.bind(this));

    this._radioMark = document.createElement('span');
    this._radioMark.className = 'radio__mark';

    this._label.appendChild(this._input);
    this._label.appendChild(this._radioMark);
    this.appendChild(this._label);
  }

  static get observedAttributes() {
    return ['name', 'value', 'id', 'text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case 'name':
        this._input.name = newValue;
        break;
      case 'value':
        this._input.value = newValue;
        break;
      case 'id':
        this._input.id = newValue;
        break;
      case 'text':
        this._label.textContent = newValue;
        this._label.appendChild(this._input);
        break;
    }
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('ready'));
  }

  setValue(value) {
    this._input.value = value;
  }

  getValue() {
    return this._input.value;
  }

  _onChange() {
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this._input.value } }));
  }


}

Utils.Register_Element(RadioButton);

export default RadioButton;

  