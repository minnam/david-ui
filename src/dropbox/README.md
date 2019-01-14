# `<Dropbox>`
Form input component which facilitates uploading of files either through a file explorer window
or a drag-and-drop function. Uses `react-dropzone`.

## Props
### fields: `object`
### label: `string`
### max: `number`

## State
### dragOver: `boolean`
### files: `array`

## Example
```
<Dropbox
  label={ 'put files here' }
  name={ 'fileField' }
  max={ maxFiles }
/>
```
```
<FieldArray
  label='Attachments'
  name='workCompletedImages'
  component={Dropbox}
  onDrop={this.props.uploadImages}
/>
```

## References
* [Dropbox component](./dropbox.jsx)
* [daily-form.jsx](../../pages/dailies/components/daily-form.jsx)
* [cards.jsx](../cards/cards.jsx)