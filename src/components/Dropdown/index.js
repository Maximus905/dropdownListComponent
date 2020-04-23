/**@jsx jsx */
import {Dropdown as DropdownBs} from "reactstrap";
import {css, jsx} from "@emotion/core";
import check from 'check-types'
import DropdownContext from "../../DropdownContext";
import {useContext} from "react";

const Dropdown = (props) => {
    const {containerWidth} = props
    const {fontRatio, state: {isOpened}, toggleOpenState} = useContext(DropdownContext)
    const width = containerWidth && check.number(containerWidth) ? containerWidth + "px" : containerWidth
    return (
        <DropdownBs css={css`
            width: ${width};
            font-size: ${fontRatio}rem;
            display: inline-block;
        `} isOpen={isOpened} toggle={toggleOpenState} >
            {props.children}
        </DropdownBs>
    )
}

Dropdown.propTypes = {...DropdownBs.propTypes}

export default Dropdown