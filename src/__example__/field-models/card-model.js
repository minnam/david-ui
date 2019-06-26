import { WEATHER_TYPES } from '../test-data'

export const TEST_CARD_MODEL = {
  test: {
    label: 'test',
    heading: 'Test',
    fields: [
      {
        label: 'Name',
        name: 'name',
        placeHolder: 'Enter Name',
        type: 'TextField'
      },
      {
        label: 'Description',
        name: 'description',
        type: 'Quill'
      },
      {
        label: 'Collection Test',
        name: 'collectionTest',
        type: 'DropdownList',
        data: WEATHER_TYPES,
        // elements in data determine what passes through filter
        collect: { key: 'label', data: ['label'] },
        generateLabel: model => {
          return model['label']
        }
      }
    ]
  }
}
