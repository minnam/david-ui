# `<Roll>`
Provides a checkbox-like toggle feature which when toggled on, displays additional text input
fields.

## Props
### fullWidth: `boolean`
Determines if component should have `width` set to `100%`.

### group: `boolean`
### input: `any`
### label: `string`
### normalize: `function`
### placeholder: `string`
### type: `string`
### style: `CSSRule`
### model: `any`
### meta: `any`

## State
### active: `boolean`
### checked: `boolean`
### hover: `boolean`
### index: `number`

## Example
```
<Field
  label={ 'Checkbox label' }
  name={ 'FieldLabel' }
  component={ Roll }
  model={[]}
/>
```

## References
* [Roll component](./roll.jsx)
* [hse-daily-form.jsx](../../pages/hse-dailies/components/hse-daily-form.jsx)