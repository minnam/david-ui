# `<DialogTitle>`
Displays the title in a `Dialog` component. Highlights text passed in as the `target` prop.

## Props
### message: `string`
The message displayed by the dialog title.

### target: `string`
Given string will be added to the `message` text, but will be styled have greater emphasis.

## Example
```
<DialogTitle
  message={ 'Are you sure want to delete' }
  target={ announcement.name }
/>,
```

## References
* [DialogTitle component](./dialog.jsx)
* [page.jsx](../../pages/page.jsx)

# `<ModalDialogPanel>`
Create a dialog window within a `Dialog` component. Prompts for a confirmation
or cancel response from user.

## Props
### close: `function`
### confirm: `function`
### content: `any`
### fullWidth: `boolean`
### height: `number` | `string`
### title: `any`
### disableActions: `boolean`

## Example
```
<Dialog
  contents = {[
    <ModalDialogPanel />
  ]}
/>
```

## References
* [Dialog component](./dialog.jsx)
* [page.jsx](../../pages/page.jsx)
* [signin.jsx](../../pages/users/components/signin.jsx)

# `<DialogPanel>`
Creates a dialog window within a `Dialog` component.

## Props
### close: `function`
### confirm: `function`
### content: `any`
### fullWidth: `boolean`
### height: `number` | `string`
### title: `any`

## Example
```
<Dialog
  contents = {[
    <DialogPanel />
  ]}
/>
```

## References
* [Dialog component](./dialog.jsx)
* [page.jsx](../../pages/page.jsx)
* [signin.jsx](../../pages/users/components/signin.jsx)

# `<Dialog>`
An overlay of the main window where modal dialog components are rendered.

## Props
### contents: `array`
### dialog: `object`
### title: `string`

## Example
```
<Dialog
  contents = {[
    <ModalDialogPanel />,
    <DialogPanel />
  ]}
/>
```

## References
* [Dialog component](./dialog.jsx)
* [page.jsx](../../pages/page.jsx)
* [signin.jsx](../../pages/users/components/signin.jsx)