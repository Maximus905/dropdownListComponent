/**@jsx jsx*/
import {jsx, css} from "@emotion/core";
import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {render} from 'react-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"
import {Button} from 'reactstrap'

import DropdownList from '../../src'

async function dropdownListData () {
  const data = Array.from(Array(10), () => 0).map((value, index) => `item-${index}`)
    data.push(true, false)
  console.log('data', data)
  return new Promise(resolve => {
    setTimeout(() => {resolve(data)}, 500)
  })
}

const icon1 = (
    <Button className="d-flex" css={css`width: 200px; height: 100%`}>
        <div className="flex-grow-1 text-truncate">text on the button</div>
        <div className="flex-grow-0 pl-1"><FontAwesomeIcon icon={faAngleDown} /></div>
    </Button>
)

const Demo = () => {
    return (
        <div className="container" css={css`width: 700px`}>
            <div className="row">
                <div className="col">
                    <h5>Example with button</h5>
                </div>
                <div className="col">
                    <h5>Example with default icon</h5>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div>
                        <DropdownList getData={dropdownListData} buttonIcon={icon1} maxWidth={200} minWidth={200} maxHeight={100} rightAlignment flip />
                    </div>
                </div>
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <DropdownList getData={dropdownListData} maxWidth={200} minWidth={200} maxHeight={100} rightAlignment flip />
                    </div>
                </div>
            </div>
        </div>
     )

}

render(<Demo/>, document.querySelector('#app'))
