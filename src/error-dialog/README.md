# `<ErrorDialog>`
Displays a modal dialog pop-up in forms when submitting forms if there are errors in any fields.
Provides link to jump to section with errors in form.

## Props
### fields: `object`
### labels: `object`

## State
### index: `number`

## Example
```
<ErrorDialog
  fields={ fields }
  labels={ labels }
/>
```
```
<Fields
  labels={FIELD_LABELS}
  names={FIELD_NAMES}
  component={ErrorDialog}
/>
```

## References
* [ErrorDialog component](./error-dialog.jsx)
* [daily-form.jsx](../../pages/dailies/components/daily-form.jsx)
* [pours-form.jsx](../../pages/pours/components/pours-form.jsx)
* [project-form.jsx](../../pages/projects/components/project-form.jsx)