describe('jest demo test', () => {
  test('tes one', () => {
    let testVar = 1
    expect(testVar).toBe(1)
  })
})
test('jest test two', () => {
  expect(true).toBeTruthy()
})

//import expect from 'expect'
//import React from 'react'
//import {render, unmountComponentAtNode} from 'react-dom'

//import Component from 'src/'

// describe('Component', () => {
//   let node
//
//   beforeEach(() => {
//     node = document.createElement('div')
//   })
//
//   afterEach(() => {
//     unmountComponentAtNode(node)
//   })
//
//   it('displays a welcome message', () => {
//     render(<Component/>, node, () => {
//       expect(node.innerHTML).toContain('Welcome to React components')
//     })
//   })
// })
