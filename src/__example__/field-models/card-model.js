import { WEATHER_TYPES } from '../test-data'

export const TEST_CARD_MODEL = {
  test: {
    label: 'test',
    heading: 'Test',
    form: [
      [
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
        }
      ],
      [
        {
          label: 'Quantaties',
          name: 'quantaties',
          type: 'Cards',
          style: {
            height: 451,
            maxHeight: '100%',
            overflow: 'auto'
          },
          model: {
            trades: {
              heading: 'Item',
              label: 'Add Quantaty',
              fields: [
                {
                  label: 'Date Added',
                  name: 'dateAdded',
                  type: 'DateTimePicker',
                  isRequired: true,
                  defaultValue: new Date()
                },
                {
                  label: 'Date Removed',
                  name: 'dateRemoved',
                  type: 'DateTimePicker',
                },                
              ]
            }
          }
        }
      ]
    ]
  },  
}
