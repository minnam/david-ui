# `<DebounceInput>`
A text field which debounces keystroke events for searches. Has a dropdown list which displays
autocompleted searches. Used in a form.

## Props
### className: `string`
### errorClassName: `string`
### inputClassName: `string`
### inputStyle: `CSSRule`
### inputWrapperClassName: `string`
### label: `string`
### labelClassName: `string`
### labelStyle: `CSSRule`
### parentClassName: `*`
### placeholder: `*`
### style: `CSSRule`
### searchKey: `string`
### type: `string`
### url: `string`
### searchKey: `string`

## State
### data: `array`
### focused: `boolean`
### hovered: `boolean`
### index: `number`
### selected: `boolean`
### value: `string`

## Example
```
<DebounceInput
  label={ 'Search here' }
/>
```
Used in a `<Field>` component form `redux-form` 
```
<Field
  component={ DebounceInput }
  label={ 'Search here' }
  name={ 'searchField' }
  placeholder={ placeHolder }
  searchKey={ searchKey }
  type={ 'text' } 
  url={ url }
/>
```

## References
* [DebounceInput component](./debounce-input.jsx)
* [cards.jsx](../cards/cards.jsx)