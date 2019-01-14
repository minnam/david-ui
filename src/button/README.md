# `<Button>`
Renders a button element to react to `onclick` events or a `Link` element to if given a `to` prop.

## Props
### className: `string`
Additional class names for styling purposes.

### disabled: `boolean`
If true, component does not respond to onclick events.

### icon: `any`
An element, image, etc. which is displayed within the button

### label: `string`
Text to be displayed in the component.

### onClick: `function`
Function trigged by onclick event.

### role: `string`
Specifies component's base style. Should be one of the following values:
* `primary`
* `secondary`
* `disabled`
Defaults to `secondary` if no value is provided`

### size: `string`
Specifies values for `font-size` and `padding`. Should be one of the following values:
* `xs`
* `sm`
* `md`
* `lg`

Defaults to `sm` if no value is provided. 

### style: `object`
Additional styles.

### to: `string`
The route to be passed to the `Link` component's `to` prop.

### type: `string`
Specifies the button element's `type` attribute.

## Example
Render component as a `button` element.
```
<Button
  className={ 'my-btn' }
  disabled={ false }
  label={ 'click me!' }
  onClick={ onClickFunc }
  size={ 'md' }
  role={ 'primary' }
/>
```
Render component as a `Link` component.
```
<Button
  disabled={ false }
  label={ 'This is a link to somewhere.' }
/>
```
## References
* [Button component](./button.jsx)
* [ToolbarButton component](../toolbar/toolbar.jsx)
* [Toggle component](../toggle/toggle.jsx)
* [table-nav.jsx](../table/table-nav.jsx)
* [password-request-form.jsx](../../pages/users/components/password-request-form.jsx)