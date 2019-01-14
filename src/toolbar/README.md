# `<Toolbar>`
Provides a toolbar heading for the top of a page which contains `ToolbarTitle` and
`ToolbarButton` components

## Props
### children: `any`

## Example
```
<Toolbar>
  <ToolbarTitleWrapper>
    <ToolbarTitle />
    <ToolbarTitle />
    <ToolbarTitle />
  </ToolbarTitleWrapper>
  <ToolbarButton />
</Toolbar>
```

## References
* [Toolbar component](./toolbar.jsx)

# `<ToolbarTitleContainer>`
Is a wrapper for a group of `ToolbarTitle` components.

## Props
### children: `any`

## Example
```
<ToolbarTitleContainer>
  <ToolbarTitle
    title={ title1 }
  />
  <ToolbarTitle
    title={ title2 }
  />
</ToolbarTitleContainer>
```

## References
* [ToolbarTitleContainer component](./toolbar.jsx)

# `<ToolbarTitle>`
Displays a breadcrumb sequence of the current page in the `Toolbar` component.

## Props
### onClick: `function`
### title: `string`
### to: `string`

## Example
```
<ToolbarTitle
  title={ 'Page name' }
  to={ pageLink }
  onClick={ onClickFunc }
/>
```

## References
* [ToolbarTitle component](./toolbar.jsx)

# `<ToolbarButton>`
Displays interative button elements in the `Toolbar` component. Uses the `Button` component.

## Props
### disabled: `boolean`
### label: `string`
### onClick: `function`
### role: `string`
### style: `any`
### to: `string`

## Example
```
<ToolbarButton
  label={ 'I am a toolbar button' }
  disabled={ false }
  onClick={ onClickFunc }
  role={ `primary' }
  style={ { marginLeft: '10px' } }
/>
```

## References
* [ToolbarButton component](./toolbar.jsx)
* [Button component](../button/button.jsx)

# `<ToolbarBreak>`
Displays a vertical line break that can be used to visually group/divide toolbar items.

## Example
```
<ToolbarBreak/>
```

## References
* [ToolbarBreak component](./toolbar.jsx)

# `<ToolbarDropdown>`
Displays a dropdown list element that is used in the `Toolbar` component.

## Props
### data: `any`
### onChange: `function`

## State
### toggled: `boolean`

## Example
```
<ToolbarDropdown
  data={ dropdownListData }
  value={ dropdownValue }
  onChange={ onChangeFunc }
/>
```

## References
* [ToolbarDropdown component](./toolbar.jsx)
