# RangeNum

A vanilla web component that combines an `<input type="range">` and an
`<input type="number">` and keeps their values/attributes in sync.

## Installation

`npm install @potch/range-num`

## Usage

```js
// provided as an ES Module
import RangeNum from "@potch/range-num";
RangeNum.register();

// If you'd like to use a different tag name
RangeNum.register("my-cool-range-num");
```

```html
<!-- in your markup -->
<label>score <range-num min="0" max="10" value="5" /></label>
```

```js
const el = document.querySelector("range-num");
el.rangeInput; // the inner input[type="range"]
el.numInput; // the inner input[type="number"]
```

RangeNum uses "light" Shadow Dom, meaning its internal `<input>` elements are
visible to DOM methods like `document.querySelectorAll('input')`

## Configuration

The following attributes will be propagated from the `<range-num>` to its
inputs:

- `disabled`
  - `disabled` attribute can also be set to `"number"`, which will then only apply
    to the underlying `<input type="number">`.
- `max`
- `min`
- `name`
  - only propagated to the inner `<input type="range">`. This is done to ensure
    only one input with that name appears in `FormData`.
- `readonly`
  - applies only to the inner `<input type="number">`.
- `step`
- `value`
  - latest `value` is synchronized to both inner inputs as well as the top-level
    `<range-num>`

## Demo

`npm run demo`
