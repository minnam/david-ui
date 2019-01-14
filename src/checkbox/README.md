# `<Checkbox>`
Renders a checkbox that when clicked, can be toggled on or off. Used as part of a form.

## Props
### fullwidth: `boolean`
Should style `width` property be set to `100%`.

### group: `boolean`

### input: `any`

### label: `string`
The string which is displayed as the checkbox's label.

### normalize: `function`

### placeholder: `string`

### type: `string`

### style: `CSSRule`

## State
### active: `boolean`
Determines if the checkbox onmousedown event is active.

### checked: `boolean`
Determines if the checkbox is currently checked.

### hover: `boolean`
Determines if the checkbox onhover event is active.

## Examples
```
<Checkbox
  fullWidth={ false }
  label={ 'check me!' }
/>
```

Used in a `<Field>` component form `redux-form` 
```
import Checkbox from './path/to/checkbox'

<Field
  label={ 'Checkbox label' }
  name={ 'formField' }
  component={ Checkbox }
/>
```

## References
* [Checkbox component](./checkbox.jsx)
* [cards.jsx](../cards/cards.jsx)
* [hse-daily-form.jsx](../../pages/hse-dailies/components/hse-daily-form.jsx)