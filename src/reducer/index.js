import check from 'check-types'
import {
    SWITCH_OPEN_STATE,
    REOPEN,
    CLICK_ON_ITEM,
    CHANGE_INPUT,
    SET_ITEM_SIZES,
    CHANGE_MENU_MAX_HEIGHT,
    UPDATE_DATA_LIST,
    REQUEST_DATA, LOADING_DATA, RECEIVE_DATA, RECEIVE_INVALID_DATA, RESET_UNSAVED,
    SET_BUTTON_WIDTH, INVALIDATE_DATA
} from "../constants/actions"
import {reopenDropdownListSetter} from "../helpers";
import {invalidateData, loadingData, receiveData, receiveInvalidData} from "../actions";
import {convertDataList, convertCheckedItemsArray, resetData} from "../helpers";

export function dispatchMiddleware(dispatch) {
    async function getData({dispatch, url, dataFieldName, labelFieldName, valueFieldName, fetchFunction, accessor, filters, sorting, wildcards, checkedItemsValue}) {
        const {emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard} = wildcards
        dispatch(loadingData())
        try {
            const result = await fetchFunction({url, accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName})
            if (check.array(result[dataFieldName])) {
                const dropdownList = convertDataList({data: result[dataFieldName], labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItemsValue})
                const checkedItemsLabel = dropdownList.reduce((acc, item) => item.checked ? acc.concat(item.label) : acc, [])
                dispatch(receiveData({
                    data: dropdownList,
                    checkedItemsValue,
                    checkedItemsLabel,
                    checkedItemsCounter: checkedItemsLabel.length
                }))
            } else {
                console.log('Dropdown list: Invalid format of fetched data: ', result )
                throw  new Error('Dropdown list: Invalid format of fetched data from server!')
            }
        } catch (e) {
            alert(e.toString())
            dispatch(receiveInvalidData())
        }
    }
    return (action) => {
        const {type, payload} = action
        const {fetchFunction, accessor, filters, sorting, wildcards, selected, url, dataFieldName, labelFieldName, valueFieldName} = payload || {}
        const {emptyValueWildcard} = wildcards || {}
        switch (type) {
            case REQUEST_DATA:
                const checkedItemsValue = convertCheckedItemsArray({emptyValueWildcard, checkedItemsValue: selected})
                return getData({dispatch, url, dataFieldName, labelFieldName, valueFieldName, fetchFunction, accessor, filters, sorting, wildcards, checkedItemsValue})
            default:
                return dispatch(action)
        }
    }
}

const rootReducer = (state, action) => {
    const {type, payload} = action
    const newState = {}
    const {multiSelect, value} = payload || {}
    const clickOnItemHandler = ({checkedItemsValue, value, multiSelect}) => {
        const checked = new Set(checkedItemsValue)
        if (!multiSelect && checked.has(value)) return checkedItemsValue
        if (multiSelect) {
            checked.has(value) ? checked.delete(value) : checked.add(value)
        } else {
            checked.clear()
            checked.add(value)
        }
        return Array.from(checked.keys())
    }

    switch (type) {
        case SWITCH_OPEN_STATE:
            return {...state, isOpened: !state.isOpened}
        case REOPEN:
            return {...state, ...reopenDropdownListSetter({reopen: state.reopen, isOpened: state.isOpened})}
        case RESET_UNSAVED:
            return {...state, unsavedChanges: false, isOpened: payload ? false : state.isOpened}
        case CLICK_ON_ITEM:
            //add/remove clicked item into checkedItemsValue array
            newState.checkedItemsValue = clickOnItemHandler({checkedItemsValue: state.checkedItemsValue, value, multiSelect})
            newState.unsavedChanges = newState.checkedItemsValue !== state.checkedItemsValue
            //set checked status in data[]
            if (newState.unsavedChanges) {
                newState.checkedItemsCounter = 0
                newState.checkedItemsLabel = []
                newState.data = state.data.map(item => {
                    if (newState.checkedItemsValue.includes(item.value)) {
                        ++newState.checkedItemsCounter
                        newState.checkedItemsLabel.push(item.label)
                        return {...item, checked: true}
                    } else {
                        return {...item, checked: false}
                    }
                })
            }
            return newState.unsavedChanges ? {...state, ...newState} : state
        case UPDATE_DATA_LIST:
            return {...state,
                data: payload,
                checkedItemsCounter: payload.reduce((acc, item) => item.checked ? ++acc : acc, 0),
                ...reopenDropdownListSetter({reopen: state.reopen, isOpened: state.isOpened})}
        case CHANGE_INPUT:
            // handle changing input value for dropdown filter search field
            return {...state, inputValue: payload}
        case SET_ITEM_SIZES:
            return {...state, itemWidth: payload.width, itemHeight: payload.height}
        case CHANGE_MENU_MAX_HEIGHT:
            return  {...state, maxHeight: payload}
        case LOADING_DATA:
            return {...state, isLoading: true, invalidData: false}
        case RECEIVE_DATA:
            return {...state, data: payload.data, checkedItemsValue: payload.checkedItemsValue, checkedItemsLabel: payload.checkedItemsLabel, checkedItemsCounter: payload.checkedItemsCounter, isLoading: false, invalidData: false}
        case RECEIVE_INVALID_DATA:
            return {...state, data: [], isLoading: false, invalidData: true}
        case INVALIDATE_DATA:
            return {...state, ...resetData()}
        case SET_BUTTON_WIDTH:
            return {...state, buttonWidth: payload}
        default:
            return state
    }
}
export default rootReducer