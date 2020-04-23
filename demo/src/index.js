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
  const data = Array.from(Array(5), () => 0).map((value, index) => `item-${index}`)
    data.push(true, false)
  console.log('data', data)
  return new Promise(resolve => {
    setTimeout(() => {resolve(data)}, 500)
  })
}

const Icon1 = ({buttonRef}) => {
    return (
        <Button className="d-flex" css={css`width: 100%`} innerRef={buttonRef} size='sm' >
            <div className="flex-grow-1 text-truncate">text on the button</div>
            <div className="flex-grow-0 pl-1"><FontAwesomeIcon icon={faAngleDown} /></div>
        </Button>
    )
}
const Icon2 = ({buttonRef}) => (
    <div className="d-flex" css={css`width: 100%`} ref={buttonRef}>
        <div className="flex-grow-1 text-truncate">text on the button</div>
        <div className="flex-grow-0 pl-1"><FontAwesomeIcon icon={faAngleDown} /></div>
    </div>
)

const innerContainerCss = css`
  width: 800px;
  height: 800px;
`
const outerContainerCss = css`
  width: 300px;
  height: 400px;
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

        <div css={css`width: 100vh; height: 100vh; padding: 30px`}>
            <h5>Example with button</h5>
            <div css={outerContainerCss}>
                <div css={innerContainerCss}>
                    <div css={elementWrapperCss} className="border border-info">
                        <p>Width dropdown menu like width button (widthMenuLikeButton property)</p>
                        <p>width of button container is 50%</p>
                        <DropdownList buttonContainerWidth={'50%'}  getData={dropdownListData} buttonIcon={Icon1} minWidth={50}  maxHeight={300} rightAlignment flip closeAfterSelect={false} selected={[true]} widthMenuLikeButton/>
                        <p>Width dropdown menu like width button (widthMenuLikeButton property)</p>
                        <p>width of button container is 100%</p>
                        <DropdownList buttonContainerWidth={'100%'}  getData={dropdownListData} buttonIcon={Icon1} minWidth={50}  maxHeight={300} rightAlignment flip closeAfterSelect={false} selected={[true]} widthMenuLikeButton/>
                        <p>width of dropdown menu is calculated as width of the longest item menu</p>
                        <p>minWidth and maxWidth restrict width of menu</p>
                        <DropdownList buttonContainerWidth={'100%'}  getData={dropdownListData} buttonIcon={Icon1} minWidth={50} maxWidth={300}  maxHeight={300} rightAlignment flip closeAfterSelect={false} selected={[true]}/>
                    </div>
                </div>
            </div>





            {/*<div className="row">*/}
            {/*    <div className="border border-info">*/}
            {/*        <h5>Example with button</h5>*/}
            {/*    </div>*/}
            {/*    <div css={col_2} className="border border-info">*/}
            {/*        <h5>Example with default icon</h5>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="row">*/}
            {/*    <div className="border border-info">*/}
            {/*        <div className="bg-light border border-dark">*/}
            {/*            <DropdownList buttonContainerWidth={'90%'}  getData={dropdownListData} buttonIcon={Icon1} maxWidth={200} minWidth={200} maxHeight={100} rightAlignment flip />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div css={col_2} className="border border-info">*/}
            {/*        <div className="d-flex justify-content-end bg-light border border-dark">*/}
            {/*            <DropdownList getData={dropdownListData} buttonIcon={Icon2} maxWidth={200} minWidth={200} maxHeight={100} rightAlignment flip />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
     )

}

render(<Demo/>, document.querySelector('#app'))
