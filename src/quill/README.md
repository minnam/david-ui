# `<Quill>`
Creates a `FieldWrapper` component for the `Quill` component from `react-quill`. Handles formatted
text input.

## Props
### input: `any`
### label: `string`
Used by the field wrappper as the label for the input.

### meta: `any`

## Example
```
<Quill
  label={ 'Quill label' }
/>
```

```
<Field
  label={ 'Label for Quill input' }
  component={ Quill }
/>
```

## References
* [Quill component](./quill.jsx)
* [FieldWrapper component](../field-wrapper/field-wrapper.jsx)
* [daily-form.jsx](../../pages/dailies/components/daily-form.jsx)