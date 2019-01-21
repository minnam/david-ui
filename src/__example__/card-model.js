export const TEST_CARD_MODEL = {
  test: {
    label: 'test',
    heading: 'Test',
    fields: [
      {
        label: 'Name',
        name: 'name',
        placeHolder: 'Enter Name',
        type: 'TextField',
      },
      {
        label: 'Description',
        name: 'description',
        type: 'Quill'
      }
    ]
  }
}