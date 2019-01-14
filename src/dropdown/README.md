# `<DropDown>`
Displays a dropdown list input.

## Props
### data: `object`
### optionRenderer: `React.Node`
### label: `string`
### onFilterChange: `function`
### onInitialFilterChange: `function`
### textField: `React.Node`
### valueRenderer: `React.Node`
### valueField: `React.Node`
### horizontal: `boolean`
### onChange: `function`

## Example
```
<Field
  ...
  component={ DropdownList }
  data={(() => {
    return [
      {
        label: 'All',
        value: {
          name: 'All'
        }
      },
      ...projects.data.map(project => {
        return {
          label: project.name,
          value: project
        }
      })
    ]
  })()}
  optionRenderer={optionRenderer}
  valueRenderer={valueRenderer}
/>
```

## References
* [ DropDown component](./dropdown.jsx)
* [cards.jsx](../cards/cards.jsx)
* [announcements-form.jsx](../../pages/announcements/components/announcements-form.jsx)
* [hse-daily-form.jsx](../../pages/hse-dailies/components/hse-daily-form.jsx)