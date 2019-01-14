# `<Cards>`
Cards component is a dynamic field container that can hold various input types like text, dropdown list, checkbox, debounced field, date, or even a Cards component itself. It is suitable for handling complexed data entry that does not have a static structure or size.

Cards component is based on **redux-form** and common constants from **JAMS**. Therefore, it is not a drop-in component that you can reuse in other projects.

## Props
### contentStyle: `CSSRule`
Additional styles for the main body of the `Card` component.
### data: `object`
### disableFixedHeader: `boolean`
Should a fixed header be displayed for the card.
### fields: `any`
### label: `string`
### meta: `object`
### model: `any`
### noPadding: `boolean`
### isChild: `boolean`
### fullHeight: `boolean`

## State
### filterTargets: `object`
### filterTargetKey: `string`
### isExpanded: `boolean`

## Example
Create a card model like following:
The commented digits are reflected on the images attached to this section
```
// example-card-model.js
export const CARD_MODEL = {
  person: { // 1
    label: 'Person', // 2
    heading: 'Person Info', // 3
    fields: [
      {
        name: 'fullname', // 4
        label: 'Full Name', // 5
        type: 'TextField', // 6
        validate: [validation.required] // 7
      }
    ]
  } 
}
```
Each key of CARD_MODEL is a independent set of input fields. Fields do not have to be identical across models. See **Addon** section of **PoursForm** for reference.

Array of inputs like this is handled as **FieldArray** in **redux-form**.
```
// example-container.jsx
import Cards from './path/to/view/cards'
import CARD_MODEL from './example-card-model'
...
render () {
  return (
    ...
    <FieldArray
      label="People" // 8
      name="people" // 9
      component={Cards}
      model={CARD_MODEL}
    />
    ...
  )
}
```

## References
* [Cards component](./cards.jsx)
* [daily-form.jsx](../../pages/dailies/components/daily-form.jsx)
* [hse-daily-form.jsx](../../pages/hse-dailies/components/hse-daily-form.jsx)

# `<CardSection>`
Provides a collapsible section of content to a `Card` component.

## Props
### body: `any`
### children: `array`
### model: `any`
### modelIndex: `any`
### remove: `any`
### id: `string`

## State
### finishedAnimation: `boolean`
### isExpanded: `boolean`

## Example
```
<CardSection
  modelIndex={ modelIndex}
  model={ model }
  isExpended={ true }
  remove={ remove }
  id={ id }
  body={
    <div className={CLASSNAMES.cardBody}>
      Content goes here
    </div>
  }
/>
```

## References

* [CardSection component](./card-section.jsx)
* [cards.jsx](./cards.jsx)