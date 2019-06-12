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
      },
      {
        label: 'Collection Test',
        name: 'collectionTest',
        type: 'DropdownList',
        data: 'users',
        // elements in data determine what passes through filter
        collect: { key: 'position', data: ['JobN', 'Job2'] },
        generateLabel: model => {
          return model['name']
        },
      }
    ]
  }
}