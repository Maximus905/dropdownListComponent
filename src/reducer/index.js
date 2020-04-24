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
    SET_BUTTON_WIDTH
} from "../constants/actions"
import {reopenDropdownListSetter} from "../helpers";
import {loadingData, receiveData, receiveInvalidData} from "../actions";
import {convertDataList, convertCheckedItemsArray} from "../helpers";

export function dispatchMiddleware(dispatch) {
    async function getData({dispatch, fetchFunction, accessor, filters, sorting, wildcards, checkedItems}) {
        const {emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard} = wildcards
        dispatch(loadingData())
        try {
            const data = await fetchFunction({accessor, filters, sorting})
            if (check.array(data)) {
                const dropdownList = convertDataList({data, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})
                dispatch(receiveData({
                    data: dropdownList,
                    checkedItems,
                    checkedItemsCounter: dropdownList.reduce((acc, item) => item.checked ? ++acc : acc, 0)
                }))
            } else {
                console.log('Dropdown list: Invalid format of fetched data: ', data )
                throw  new Error('Dropdown list: Invalid format of fetched data from server!')
            }
        } catch (e) {
            alert(e.toString())
            dispatch(receiveInvalidData())
        }
    }
    return (action) => {
        const {type, payload} = action
        const {fetchFunction, accessor, filters, sorting, wildcards, selected} = payload || {}
        const {emptyValueWildcard} = wildcards || {}
        switch (type) {
            case REQUEST_DATA:
                const checkedItems = convertCheckedItemsArray({emptyValueWildcard, checkedItems: selected})
                return getData({dispatch, fetchFunction, accessor,  filters, sorting, wildcards, checkedItems})
            default:
                return dispatch(action)
        }
    }
}

const rootReducer = (state, action) => {
    const {type, payload} = action
    const newState = {}
    const {multiSelect, value} = payload || {}
    const clickOnItemHandler = ({checkedItems, value, multiSelect}) => {
        const checked = new Set(checkedItems)
        if (!multiSelect && checked.has(value)) return checkedItems
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
            //add/remove clicked item into checkedItems array
            newState.checkedItems = clickOnItemHandler({checkedItems: state.checkedItems, value, multiSelect})
            newState.unsavedChanges = newState.checkedItems !== state.checkedItems
            //set checked status in data[]
            if (newState.unsavedChanges) {
                newState.checkedItemsCounter = 0
                newState.data = state.data.map(item => {
                    if (newState.checkedItems.includes(item.value)) {
                        ++newState.checkedItemsCounter
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
            return {...state, data: payload.data, checkedItems: payload.checkedItems, checkedItemsCounter: payload.checkedItemsCounter, isLoading: false, invalidData: false}
        case RECEIVE_INVALID_DATA:
            return {...state, data: [], isLoading: false, invalidData: true}
        case SET_BUTTON_WIDTH:
            return {...state, buttonWidth: payload}
        default:
            return state
    }
}
export default rootReducer