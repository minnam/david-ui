# `<TextField>`
Provides text input field for a form. Uses `FieldWrapper` component. Used in `Form` components.

## Props
### className: `string`
Additional classname for input element.

### errorClassName: `string`
Classname used by FieldWrapper error message.

### input: `HTMLInputElement`
input.

### inputStyle: `CSSRule`
Additional styling for the input element.

### help: `string`
Text to be displayed as a help message.

### inputWrapperClassName: `string`
Classname used by the FieldWrapper input wrapper.

### label: `string`
The text displayed in the Field wrapper label.

### labelClassName: `string`
Additional classname for the label.

### labelStyle: `CSSRule`
Additional styles for the label.

### meta: `any`
### normalize: `any`
### parentClassName: `any`
Classname used by the Field wrapper parent wrapper.

### placeholder: `any`
The input placeholder attribute.

### style: `CSSRule`
Additional styles.

### type: `string`
Specifies the input type.

## Example
```
<Field
  component={ TextField }
  label={ 'Enter text' }
  name={ 'EnteredText' }
/>
```

## References
* [TextField component](./text-field.jsx)
* [FieldWrapper component](../field-wrapper/field-wrapper.jsx)
