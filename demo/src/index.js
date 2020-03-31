/**@jsx jsx*/
import {jsx, css} from "@emotion/core";
import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {render} from 'react-dom'

import DropdownList from '../../src'
// import {dropdownListData} from "./async";

async function dropdownListData () {
  const data = Array.from(Array(10), () => 0).map((value, index) => `item-${index}`)
  console.log('data', data)
  return new Promise(resolve => {
    setTimeout(() => {resolve(data)}, 500)
  })
}

const buttonSt = css`
  width: 100%;
  height: 20px;
  border: 1px solid #797979;
  border-radius: 3px;
  background-color: aqua;
`
const icon = <div css={buttonSt}/>

class Demo extends Component {
  render() {
    console.log('data', dropdownListData())

    return <div>
      <h1>Demo component</h1>
      <div css={css`width: 50%; padding: 100px`}>
        <DropdownList getData={dropdownListData} buttonIcon={icon} />
      </div>

    </div>
  }
}

render(<Demo/>, document.querySelector('#app'))
