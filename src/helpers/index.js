import check from 'check-types'

export const reopenDropdownListSetter = ({reopen, isOpened}) => {
    if (!reopen && isOpened) {
        return {reopen: true, isOpened: false}
    } else if (reopen && !isOpened){
        return {reopen: false, isOpened: true}
    }
}

function createListFromArray({data, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems = []}) {
    const resMap = data.reduce((acc, item) => {
        if (item === true) {
            return acc.set(item, {value: item, label: trueWildcard, checked: checkedItems.includes(item)})
        } else if (item === false) {
            return acc.set(item, {value: item, label: falseWildcard, checked: checkedItems.includes(item)})
        } else if (item === '' || item === null || item === undefined) {
            return acc.set(emptyValueWildcard, {value: emptyValueWildcard, label: emptyWildcard, checked: checkedItems.includes(emptyValueWildcard)})
        } else {
            return acc.set(item, {value: item, label: item, checked: checkedItems.includes(item)})
        }
    }, new Map())
    return Array.from(resMap.values())
}

function createListFromArrayOfObjects({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems = []}) {
    let value
    let label
    const resMap = data.reduce((acc, item) => {
        //check value
        if (item[valueFieldName] === '' || item[valueFieldName] === null || item[valueFieldName] === undefined) {
            value = emptyValueWildcard
        } else {
            value = item[valueFieldName]
        }
        //check label
        if (item[labelFieldName] === '' || item[labelFieldName] === null || item[labelFieldName] === undefined) {
            label = emptyWildcard
        } else if (item[labelFieldName] === true) {
            label = trueWildcard
        } else if (item[labelFieldName] === false) {
            label = falseWildcard
        } else {
            label = item[labelFieldName]
        }
        //create record in Map
        return acc.set(value, {value, label, checked: checkedItems.includes(value)})
    }, new Map())
    return Array.from(resMap.values())
}

export function convertCheckedItemsArray({emptyValueWildcard, checkedItems = []}) {
    const resMap = checkedItems.reduce((acc, item) => {
        return acc.add(item === '' || item === null || item === undefined ? emptyValueWildcard : item)
    }, new Set())
    return Array.from(resMap.values())
}

export function convertDataList ({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems}) {
    if (data.length === 0) return data
    const testItem = data[0]
    if (check.object(testItem)) {
        return createListFromArrayOfObjects({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})
    } else {
        return createListFromArray({data, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})
    }
}
