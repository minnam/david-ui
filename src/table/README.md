# `<Col>`
Displays a cell of data in a `Row` component.

## Props
### children: `any`
children Content

### className: `string`
className for base

### disable: `boolean`
Disable column

### onClick: `function`
onClick callback for column

### primary: `boolean`
If true, bold the text

### styles: `CSSRules`
Style for base

### target: `string`
URL for react router

### to: `string`
URL for regular anchor tag

## Example
```
<Row>
  <Col>{ cellValue }</Col>
</Row>
```

## References
* [Col component](./col.jsx)

# `<RowActionButton>`
Creates a button for interacting with a given `Row` component. Passed to `Row` in its `actions`
prop.

## Props
### label: `string`
Text displayed in button element.

### onClick: `function`
callback function.

### to: `string`
Url for Link route.

### disabled: `boolean`
Determines if button should be disabled.

## Example
```
<RowActionButton
  label={ 'Row link button' }
  to={ rowUrl }
/>
```
```
<RowActionButton
  label={ 'Row onClick button' }
  onClick={ rowOnClickFunc }
/>
```

## References
* [RowActionButton component](./row-action-button.jsx)

# `<Row>`
Displays a row of data in a `Table` component. Typically created via a loop. Contains `Col`
components for each cell of data.

## Props
###  actions: `array`
###  children: `any`
###  className: `string`
###  disable: `boolean`
###  displayToggle: `boolean`
###  onToggle: `function`
###  style: `CSSRule`
###  toggled: `boolean`

## State
### actionToggled: `boolean`
### toggled: `boolean`

## Example
```
<Table>
  <Row>
    <Col>{ someData }</Col>
  </Row>
</Table>
```

## References
* [Row component](./row.jsx)

# `<Search>`
Used in `Table` Component. Provides a toggleable serach bar for finding entries in a table via
text search.

## Props
### searchText: `string`
### setSearchText: `function`
### onToggle: `function`
### toggled: `boolean`

## Example
```

```

## References
* [Search component](./search.jsx)

# `<TableNav>`
Used in addition to `Table` component. Provides a forwards/backwards navigation function for
Tables which contain mulitple pages of information.

## Props
### page: `number`
### count: `number`
### increasePage: `function`
### decreasePage: `function`

## Example
```
<TableNav
  page={ currentPage }
  increasePage={ incFunc }
  decreasePage={ decFunc }
  count={ numPages }
/>
```

## References
* [TableNav component](./table-nav.jsx)

# `<Table>`
Displays a table of information. Uses `Row`, `Col`, `TableNav` and `Search` components.

## Props
### children: `array`
### className: `string`
### displayActions: `boolean`
### displaySubMenu: `boolean`
### displayFixedHeader: `boolean`
### displayToggle: `boolean`
### fixedHeaderOffset: `number`
### headers: `array`
### id: `string`
### searchText: `string`
### setSearchText: `function`
### style: `CSSRule`
### title: `string`
### tools: `any`

## State
### fixedHeaderToggled: `boolean`
### searchToggled: `boolean`

## Example
```
<Table>
  <Row>
    <Col></Col>
  </Row>
  <Row>
    <Col></Col>
  </Row>
  <Row>
    <Col></Col>
  </Row>
</Table>
```

## References
* [Table component](./table.jsx)