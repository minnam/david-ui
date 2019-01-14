# `<Gallery>`
Displays an image with navigation buttons to cycle through a set of images.

## Props
### index: `number`
The index of the image in the array of images. First passed as a prop to the state as user
can select any image in the list.

### baseUrl: `string`
The backend url for the image.

### images: `array`
Array of image (file) objects.

## State
### index: `number`
The index of the image in the array of images.

## Example
```
<Gallery 
  baseUrl={ backendUrl } 
  images={ imageArray } 
  index={ index }
/>,
```

## References
* [Gallery component](./gallery.jsx)
* [daily-view.jsx](../../pages/dailies/components/daily-view.jsx)