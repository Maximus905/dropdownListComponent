/**@jsx jsx*/
import {jsx, css, } from "@emotion/core";
import React, {useEffect, useReducer, useRef} from "react"
import './typeDefs'
import PropTypes from 'prop-types'
import {DropdownToggle, Button} from 'reactstrap'
import DefaultButton from "./components/DefaultButton";
import Dropdown from "./components/Dropdown";
import DropdownMenu from "./components/DropdownMenu"
import DropdownButton from "./components/DropdownButton"
import MenuBody from "./components/MenuBody";
import rootReducer, {dispatchMiddleware} from "./reducer";
import {initialState} from "./constants/initialState";
import {changeMenuMaxHeight, switchOpenState, requestData, resetUnsaved, setButtonWidth} from "./actions";
import DropdownContext from "./DropdownContext";
import {defaultDataLoader} from "./loaders";

const DropdownList = (props) => {
    const {buttonContainerWidth, buttonIcon, accessor, dataUrl, dataFieldName, dataLoader, labelFieldName, valueFieldName, filters, sorting, selected,
        applyInstantly, closeAfterSelect,
        maxHeight, maxWidth,minWidth,
        flip,
        rightAlignment,
        emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard,
        onChangeSelected: onChangeSelectedExt,
        onOpen: onOpenExt,
        onClose: onCloseExt
    } = props
    const DropdownButton = buttonIcon ? buttonIcon : DefaultButton
    const buttonRef = useRef(null)
    const wildcards = {emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard}
    const bdColor = 'rgb(206,212,218)'
    const offset = {
        enabled: true,
        fn: (data) => {
            return {
                ...data,
                styles: {
                    ...data.styles,
                    top: -5,
                    left: 5,
                },
            }
        }
    }

    const [state, dispatch] = useReducer(rootReducer, {...initialState,
        maxHeight, maxWidth, minWidth,
    })
    const {checkedItemsValue, checkedItemsLabel, isOpened, reopen, invalidData, unsavedChanges} = state
    const asyncDispatch = dispatchMiddleware(dispatch)

    const toggleOpenState = () => dispatch(switchOpenState())
    useEffect(() => {
        if (!buttonRef.current) return
        if (buttonRef.current.clientWidth !== state.buttonWidth) dispatch(setButtonWidth({width: buttonRef.current.clientWidth}))
    }, [buttonRef.current])
    // for lazy loading data for list when list is opening
    useEffect(() => {
        if (isOpened && invalidData) {
            asyncDispatch(requestData({url: dataUrl, dataFieldName, fetchFunction: dataLoader, labelFieldName, valueFieldName, accessor, filters, sorting, wildcards, selected})).then(r => console.log('data is fetched'))
        }
    }, [isOpened, invalidData])
    useEffect(() => {
        if (isOpened) {
            onOpenExt({accessor})
        } else if (isOpened === false) {
            onCloseExt({accessor, value: checkedItemsValue, label: checkedItemsLabel})
            if (unsavedChanges && !applyInstantly) {
                onChangeSelectedExt({accessor, value: checkedItemsValue, label: checkedItemsLabel})
                dispatch(resetUnsaved(closeAfterSelect))
            }
        }
    }, [isOpened])
    useEffect(() => {
        dispatch(changeMenuMaxHeight(maxHeight))
    }, [maxHeight])

    //invoke external onChangeFilter for changing depends on applyInstantly param
    useEffect(() => {
        if (unsavedChanges && applyInstantly) {
            onChangeSelectedExt({accessor, value: checkedItemsValue, label: checkedItemsLabel})
            dispatch(resetUnsaved(closeAfterSelect))
        }
        // if (closeAfterSelect) dispatch(switchOpenState())
    }, [unsavedChanges])

    //watch reopen signal (reopen === true), reset them and open filter
    useEffect(() => {
        if (reopen) {
            dispatch(reopen())
        }
    }, [reopen])

    const context = {
        ...props,
        state,
        dispatch: asyncDispatch,
        toggleOpenState,
        bdColor,

    }
    const toggleCss = css`
      padding: 0 !important;
      position: relative;
      width: 100%;
    `
    return (
        <DropdownContext.Provider value={context} >
            <Dropdown containerWidth={buttonContainerWidth} onClick={(e) => {
                e.stopPropagation()
            }} >
                <DropdownToggle css={toggleCss} tag='div' >
                    <DropdownButton buttonRef={buttonRef} checkedItemsValue={checkedItemsValue} checkedItemsLabel={checkedItemsLabel} />
                </DropdownToggle>
                <DropdownMenu modifiers={offset} flip={flip} right={rightAlignment}>
                    <MenuBody />
                </DropdownMenu>
            </Dropdown>
        </DropdownContext.Provider>
    )
}
DropdownList.propTypes = {
    dataUrl: PropTypes.string,
    dataFieldName: PropTypes.string,
    dataLoader: PropTypes.func, // async function like async ({url, accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName}) => {}
    accessor: PropTypes.string,
    filters: PropTypes.object,
    sorting: PropTypes.object,

    selected: PropTypes.array,

    buttonContainerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //100 -> 100px, '50%' -> '50%'
    multiSelect: PropTypes.bool,
    applyInstantly: PropTypes.bool,
    closeAfterSelect: PropTypes.bool,
    // data: PropTypes.arrayOf(oneOfType([PropTypes.object, PropTypes.string, PropTypes.number, PropTypes.bool]) ),
    // loadingState: PropTypes.bool,
    maxHeight: PropTypes.number, // maxHeight of dropdown list in px
    maxWidth: PropTypes.number, // maxWidth of dropdown list in px
    minWidth: PropTypes.number, //minWidth of dropdown list
    widthMenuLikeButton: PropTypes.bool, // if true - set dropdown's menu width as button width

    flip: PropTypes.bool,
    rightAlignment: PropTypes.bool, // right alignment if true, else left alignment
    //handlers
    onChangeSelected: PropTypes.func, // every time when filter changes
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    //
    fontRatio: PropTypes.number,

    labelFieldName: PropTypes.string, // if server's response is array of objects
    valueFieldName: PropTypes.string, // if server's response is array of objects
    emptyWildcard: PropTypes.string,
    emptyValueWildcard: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    falseWildcard: PropTypes.string,
    trueWildcard: PropTypes.string,
    emptyListWildcard: PropTypes.string,
    loadingWildcard: PropTypes.string,

    opened: PropTypes.bool, //initial state of filter

    buttonIcon: PropTypes.any,
}
DropdownList.defaultProps = {
    dataFieldName: 'data',
    dataLoader: defaultDataLoader,
    multiSelect: false,
    closeAfterSelect: false,
    applyInstantly: true,
    selected: [],
    fontRatio: 1,
    // maxWidth: 200,
    minWidth: 0,
    widthMenuLikeButton: false,
    maxHeight: 400,

    flip: true,

    labelFieldName: 'lab',
    valueFieldName: 'val',
    emptyWildcard: '<пусто>',
    emptyValueWildcard: '',
    falseWildcard: 'false',
    trueWildcard: 'true',
    emptyListWildcard: 'нет элементов',

    loadingWildcard: 'loading...',
    opened: false,
    onOpen: ({accessor}) => console.log('onOpen', {accessor}),
    onClose: ({accessor, value, label}) => console.log('onClose', {accessor, value, label}),
    onChangeSelected: ({accessor, value, label}) => {console.log('onChangeSelected', {accessor, value, label})}
}

export default DropdownList