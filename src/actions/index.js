import {
    SWITCH_OPEN_STATE,
    CLICK_ON_ITEM,
    CHANGE_INPUT,
    SET_ITEM_SIZES,
    CHANGE_MENU_MAX_HEIGHT,
    UPDATE_DATA_LIST, REOPEN,
    REQUEST_DATA, LOADING_DATA, RECEIVE_DATA, RECEIVE_INVALID_DATA, RESET_UNSAVED,
    SET_BUTTON_WIDTH, INVALIDATE_DATA,
} from "../constants/actions";

// ope/close
export const switchOpenState = () => ({type: SWITCH_OPEN_STATE})
export const reopen = () => ({type: REOPEN})

export const clickOnItem = ({value, multiSelect}) => ({type: CLICK_ON_ITEM, payload: {value, multiSelect}})
export const resetUnsaved = (closeAfterSelect) => ({type: RESET_UNSAVED, payload: closeAfterSelect})
export const changeInput = (value) => ({type: CHANGE_INPUT, payload: value})
export const setItemSizes = ({width, height}) => ({type: SET_ITEM_SIZES, payload: {width, height}})
export const changeMenuMaxHeight = (value) => ({type: CHANGE_MENU_MAX_HEIGHT, payload: value})
export const updateDataList = (data) => ({type: UPDATE_DATA_LIST, payload: data})
export const requestData = ({url, dataFieldName, fetchFunction, labelFieldName, valueFieldName, accessor, filters, sorting, wildcards, selected}) => ({type: REQUEST_DATA, payload: {url, dataFieldName, fetchFunction, labelFieldName, valueFieldName, accessor, filters, sorting, wildcards, selected}})
export const loadingData = () => ({type: LOADING_DATA})
export const receiveData = ({data, checkedItemsValue, checkedItemsLabel, checkedItemsCounter}) => ({type: RECEIVE_DATA, payload: {data, checkedItemsValue, checkedItemsLabel, checkedItemsCounter}})
export const receiveInvalidData = () => ({type: RECEIVE_INVALID_DATA})
export const setButtonWidth = ({width}) => ({type: SET_BUTTON_WIDTH, payload: width})
export const invalidateData = () => ({type: INVALIDATE_DATA})
