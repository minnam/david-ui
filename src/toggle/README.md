# `<Toggle>`
Displays an icon that can be toggled on or off when clicked. Uses the `Button` component.

## Props
### iconOff: `string`
Material icon name for off state.

### iconOn: `string`
Material icon name for on state.

### togged: `boolean`
Toggle state. Toggled on if true; off if false.

## Example
```
<Toggle
  toggled={ true }
  iconOn={ 'onIcon' }
  iconOff={ 'offIcon' }
/>
```

## References
* [Toggle component](./toggle.jsx)
* [Button component](../button/button.jsx)
* [Row component](../table/row.jsx)