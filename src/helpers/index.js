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
    console.log('helpers', Array.from(resMap.values()))
    return Array.from(resMap.values())
}
export function convertCheckedItemsArray({emptyValueWildcard, checkedItems = []}) {
    const resMap = checkedItems.reduce((acc, item) => {
        return acc.add(item === '' || item === null || item === undefined ? emptyValueWildcard : item)
    }, new Set())
    return Array.from(resMap.values())
}

export function convertDataList ({data, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems}) {
    if (data.length === 0) return []
    return createListFromArray({data, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})
}