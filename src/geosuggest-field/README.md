# `<GeosuggestField>`
Text input field which gives auto complete locations based on partial user input.

## Props
### input: `any`
### label: `string`
The label for the input field.

### meta: `any`

## Example
```
<GeosuggestField
  label={ 'Search for location' }
/>
```
```
<Field
  label="Address"
  name="address"
  component={GeosuggestField}
  validate={[validation.required]}
  isRequired
/>
```

## References
* [GeosuggestField component](./geosuggest.jsx)
* [trades-form.jsx](../../pages/trades/components/trades-form.jsx)