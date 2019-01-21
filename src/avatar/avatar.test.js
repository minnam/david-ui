import React from 'react'
import Avatar from './avatar'
import renderer from 'react-test-renderer'

describe('Avatar', () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <Avatar greeting={true}/>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})

// test('', () => {
//   const component = renderer.create(
//     <Avatar greeting={true}/>
//   )

//   const tree = component.toJSON()
//   expect(tree).toMatchSnapshot()

// })