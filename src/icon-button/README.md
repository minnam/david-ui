# `<IconButton>`
A button that utilizes Material Icons to display a button element which typicall functions to toggle
something.

## Props
### className: `string`
Additional class names to be added to the button element.

### icon: `string`
The Material Icon to use.

### onClick: `function`
Callback function.

### type: `string`
The `type` attribute for the button element. Defaults to `button` if no value is given.

## Example
```
<IconButton
  className={ myClass }
  onClick={ onClickFunc }
  icon={ 'search' }
  type={ 'button' }
/>
```

## References
* [IconButton component](./icon-button.jsx)
* [Table component](../table/table.jsx)
* [Search](../table/search.jsx)