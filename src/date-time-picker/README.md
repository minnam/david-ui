# `<DateTimePicker>`
Displays an text input field for entering a date and time. Also has a calendar
GUI for selecting the date. Used as part of a form.

## Props
### input: `object`
### inputStyle: `CSSRule`
### label: `string`

## State
### hovered: `boolean`
### selectedDate: `date`
### toggled: `boolean`

## Example
```
<DateTimePicker
  input={ myInput }
  inputStyle={ myStyle }
  label={ 'Pick the date' }
/>
```
Used in a `<Field>` component form `redux-form` 
```
<Field
  label={ 'Pick the date' }
  name={ 'dateField' }
  component={ DateTimePicker }
/>
```

## Reference
* [DateTimePicker component](./date-time-picker.jsx)
* [Calendar component](../calendar/calendar.jsx)
  * [Calendar docs](../calendar/README.md)
* [cards.jsx](../cards/cards.jsx)
* [daily-form.jsx](../../pages/dailies/components/daily-form.jsx)
* [project-form.jsx](../../pages/projects/components/project-form.jsx)