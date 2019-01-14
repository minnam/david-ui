# `<Subheader>`
Displays a subheading with a linebreak to notate reports. Can also display mulitple subheadings
in a row with additional information.

## Props
### `items`: array
Used if there are several titles to be displayed by the subheader.

### `style`: CSSRule
Additional styles to be applied.

### `title`: string
Text to be displayed as the subheading.

## Example
```
<Subheader
  title={ 'Subheading' }
/>
```
```
<Subheader
  title={ 'Subheading with more info' }
  // would display additional subheading: 'This is example: 2'
  items={[
    title: 'This is example',
    value: 2
  ]}
/>
```

## References
* [Subheader component](./subheader.jsx)
* [daily-view.jsx](../../pages/dailies/components/daily-view.jsx)
* [daily-view.jsx](../../pages/hse-dailies/components/hse-daily-view.jsx)