import React from 'react'
import Button from './button'
import renderer from 'react-test-renderer'

describe('Button', () => {
  it('Render label without size', () => {
    const component = renderer.create(
      <Button
        label={'Hello World'}
        primary
      />
    )
    const rootInstance = component.root
    const button = rootInstance.findByType('button')

    expect(button.props.children[1]).toBe('Hello World')
  })
})

// test('', () => {
//   const component = renderer.create(
//     <Avatar greeting={true}/>
//   )

//   const tree = component.toJSON()
//   expect(tree).toMatchSnapshot()

// })