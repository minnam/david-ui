# `<Form>`
Wrapper for input submission.  Used with `FormSection` components and other form elements.

## Props
### children: `any`
### onCancel: `function`
### onSubmit: `function`
### submitting: `boolean`
### title: `string`
### tools: `array`

## State
### finishedAnimation: `boolean`

## Example
```
<Form>
  <FormSection>
    <Field />
  </FormSection>
    <FormSection>
    <Field />
  </FormSection>
</Form>
```

## References
* [Form component](./form.jsx)
* [daily-form.jsx](../../pages/dailies/components/daily-form.jsx)
* [announcements-form.jsx](../../pages/announcements/components/announcements-form.jsx)

# `<FormSection>`
Creates a independant segment within a `Form` component. Use in combination with `Field` and
`FieldArray` components.

## Props
### children: `any`
### className: `string`
### contentStyle: `object`
### fixedHeader: `boolean`
### float: `boolean`
### noPadding: `boolean`
### style: `object`
### title: `string`
### tools: `array`

## Example
```
  <FormSection>
    <Field />
    <Field />
    <Field />
  </FormSection>
```

## References
* [FormSection component](./form-section.jsx)
* [daily-form.jsx](../../pages/dailies/components/daily-form.jsx)
* [announcements-form.jsx](../../pages/announcements/components/announcements-form.jsx)