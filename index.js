export default class RangeNum extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.append(document.createElement("slot"));
    this.boundUpdateControls = this.updateControls.bind(this);
    for (let attr of RangeNum.observedAttributes) {
      this.updateProp(attr);
    }
  }

  static observedAttributes = [
    "disabled",
    "max",
    "min",
    "name",
    "readonly",
    "step",
    "value",
  ];

  static register(tagName = "range-num") {
    customElements.define(tagName, RangeNum);
  }

  connectedCallback() {
    this.value = this.getAttribute("value") || this.min || this.max || 0;

    this.addEventListener("input", this.handleInput);
    this.shadowRoot.addEventListener("slotchange", this.boundUpdateControls);

    if (!this.rangeInput) {
      this.rangeInput = Object.assign(document.createElement("input"), {
        type: "range",
      });
    }
    if (!this.numInput) {
      this.numInput = Object.assign(document.createElement("input"), {
        type: "number",
      });
    }
    this.append(this.rangeInput, this.numInput);
  }

  disconnectedCallback() {
    this.removeEventListener("input", this.handleInput);
    this.shadowRoot.removeEventListener("slotchange", this.boundUpdateControls);
  }

  updateControls() {
    for (let attr of RangeNum.observedAttributes) {
      this.updateProp(attr);
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    this.updateProp(name);
  }

  updateProp(attr) {
    if (!this.rangeInput && !this.numInput) return;
    if (attr === "disabled") {
      if (this.getAttribute(attr) !== "number") {
        this.rangeInput.disabled = this.hasAttribute("disabled");
      }
      this.numInput.disabled = this.hasAttribute("disabled");
    } else if (attr === "readonly") {
      this.numInput.readOnly = this.hasAttribute("readonly");
    } else {
      if (this.hasAttribute(attr)) {
        if (attr !== "name") {
          this.numInput[attr] = this.getAttribute(attr);
        }
        this.rangeInput[attr] = this.getAttribute(attr);
      }
    }
  }

  handleInput(e) {
    const { rangeInput, numInput } = this;
    const target = e.target;
    this.setAttribute("value", target.value);
    if (target === numInput) {
      rangeInput.value = numInput.value;
    }
    if (target === rangeInput) {
      numInput.value = rangeInput.value;
    }
  }
}

for (let attr of RangeNum.observedAttributes) {
  Object.defineProperty(RangeNum.prototype, attr, {
    get() {
      return this.getAttribute(attr);
    },
    set(newValue) {
      this.setAttribute(attr, newValue);
    },
    enumerable: true,
    configurable: true,
  });
}
