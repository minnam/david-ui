# `<Avatar>`
Displays a Circular logo with a speech-bubble styled section of content next to it.

## Props 
### fullWidth: `boolean`
If set to true, component will have its CSS `width` property set to `100%`
### greeting: `boolean`
If true, display a greeting string based on the time of day.
### message: `string`, `element`
The content to be displayed by the Avatar. Can be a string of text and/or nested elements.
### type: `string`
Specifies which image to use for the Avatar's logo. String should be one of the following:
* `logo`
* `default`
* `error`

## Examples
A basic usage of Avatar which displays a message.
```
<Avatar
  fullWidth={ true }
  greeting={ false }
  message={ 'hello world!' }
  type={ 'default' }
/>
```
An Avatar using a combination of elements and strings to utilize Material Icons.
```
<Avatar
  fullWidth={ false }
  greeting={ false }
  message={ 
    <i className={ 'material-icons' }>hourglass_empty</i> 
    <span>Please wait...</span>
  }
  type={ 'logo' }
/>
```

## References
* [Avatar Component](./avatar.jsx)
* [loading.jsx](../loading/loading.jsx)
* [dashboard.jsx](../../pages/dashboard/components/dashboard.jsx)
* [not-found.jsx](../../pages/not-found.jsx)
* [user-password-reset-form.jsx](../../pages/users/components/user-password-reset-form.jsx)
* [signin.jsx](../../pages/users/components/signin.jsx)