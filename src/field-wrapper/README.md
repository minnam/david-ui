# `<FieldWrapper>`
Acts as a container for a form field and the associated label.

## Props
### children: `any`
Child elements.

### error: `string`
An error message to be displayed.

### errorClassName: `string`
Additional classname for the error message section.

### horizontal: `boolean`
Determines if styling vertically or horizontally spaced styling should be applied

### inputWrapperClassName: `string`
Additional classname for the wrapper div for child elements.

### label: `string`
Text to label the field(s) within the field wrapper.

### labelClassName: `string`
Additional classname for the label.

### labelStyle: `object`
Additional styles for the label.

### parentClassName: `string`
Additional classname for the wrapper div.

### style: `object`
Additional styles.

### touched: `boolean`
Determines if the field been interacted with.

## Example
```
<FieldWrapper>
  <input />
</FieldWrapper>
```

## References
* [FieldWrapper component](./field-wrapper.jsx)