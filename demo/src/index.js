/**@jsx jsx*/
import {jsx, css} from "@emotion/core";
import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {render} from 'react-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"
import {Button} from 'reactstrap'

import DropdownList from '../../src'
import {text} from "@fortawesome/fontawesome-svg-core";

async function dropdownListData ({url, accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName}) {
  const data = Array.from(Array(5), () => 0).map((value, index) => `item-${index} another long text and so on`)
    data.push(true, false)
  console.log('data', {data, accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName})
  return new Promise(resolve => {
    setTimeout(() => {resolve({data})}, 500)
  })
}
async function dropdownListDataAsObjArray ({url, accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName}) {
  const data = Array.from(Array(5), () => 0).map((value, index) => (
      {[valueFieldName]: `val-${index}`, [labelFieldName]: `item-${index} another long text and so on`}
      ))
    data.push({val: true, lab: true})
    data.push({val: false, lab: false})
  console.log('data', {data, accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName})
  return new Promise(resolve => {
    setTimeout(() => {resolve({data})}, 500)
  })
}

const Icon1 = ({buttonRef}) => {
    return (
        <Button className="d-flex" css={css`width: 100%`} innerRef={buttonRef} size='sm' >
            <div className="flex-grow-1 text-truncate" title="text on the button">text on the button</div>
            <div className="flex-grow-0 pl-1"><FontAwesomeIcon icon={faAngleDown} /></div>
        </Button>
    )
}

const innerContainerCss = css`
  width: 600px;
  height: 600px;
`
const outerContainerCss = css`
  width: 300px;
  height: 300px;
  overflow-x: auto;
  overflow-y: auto;
`
const elementWrapperCss = css`
  width: 250px;
  margin: 30px;
  margin-top: 400px;
`
const ex_1 = css`
  width: 100%;
  margin: 30px;
`

const Demo = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <p>Width dropdown menu like width button (widthMenuLikeButton property), data loader gives data as array</p>
                    <div className="col-4 bg-info">
                        <p>container for button</p>
                        <p>width of button - 50%</p>
                        <DropdownList dataUrl="http://test.url" accessor="testAccessor"  buttonContainerWidth={'50%'}  dataLoader={dropdownListData} buttonIcon={Icon1} minWidth={150}  maxHeight={300} rightAlignment flip closeAfterSelect={false} selected={[true]} widthMenuLikeButton/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Width dropdown menu like width button (widthMenuLikeButton property), data as array of objects</p>
                    <div className="col-4 bg-info">
                        <p>width of button - 100%</p>
                        <DropdownList buttonContainerWidth={'100%'} accessor="testAccessor"  dataUrl="http://test.url"  dataLoader={dropdownListDataAsObjArray} buttonIcon={Icon1} minWidth={50}  maxHeight={300} rightAlignment flip closeAfterSelect={false} selected={[true]} widthMenuLikeButton/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>width of dropdown menu is calculated as width of the longest item menu</p>
                    <div className="col-4 bg-info">
                        <p>minWidth and maxWidth restrict width of menu</p>
                        <DropdownList buttonContainerWidth={'100%'}  dataLoader={dropdownListData} buttonIcon={Icon1} minWidth={50} maxWidth={300}  maxHeight={300} rightAlignment flip closeAfterSelect={false} selected={[true]}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>online test</p>
                    <div className="col-4 bg-info">
                        <p>minWidth and maxWidth restrict width of menu</p>
                        <DropdownList dataUrl="http://netcmdb-loc.rs.ru:8082/phone/officeList.json" accessor="office" buttonContainerWidth={'100%'}  buttonIcon={Icon1} minWidth={50} maxWidth={300}  maxHeight={300} rightAlignment flip closeAfterSelect={false} selected={[true]}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Width dropdown menu like width button (widthMenuLikeButton property)</p>
                    <div className="col-4 bg-info">
                        <p>width of button - 100%</p>
                        <DropdownList buttonContainerWidth={'100%'}  dataUrl="http://netcmdb-loc.rs.ru:8082/api/tableFilterList.json" accessor="office" buttonIcon={Icon1} minWidth={50}  maxHeight={300} rightAlignment flip closeAfterSelect={false} selected={[true]} widthMenuLikeButton/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h5>Example of behavior in scrolled area</h5>
                    <div css={outerContainerCss}>
                        <div css={innerContainerCss}>
                            <div css={elementWrapperCss} className="border border-info">
                                <DropdownList dataUrl="http://test.url" accessor="testAccessor" dataLoader={dropdownListData} buttonContainerWidth={'50%'} buttonIcon={Icon1} minWidth={50} maxHeight={300} rightAlignment flip closeAfterSelect={false} selected={[true]} widthMenuLikeButton/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div style={{height: '400px'}}/>
        </div>
     )

}

render(<Demo/>, document.querySelector('#app'))
