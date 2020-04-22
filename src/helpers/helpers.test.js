import {convertDataList, convertCheckedItemsArray} from "./index";

const labelFieldName = 'lab'
const valueFieldName = 'val'
const emptyWildcard = '<empty>'
const emptyValueWildcard = ''
const trueWildcard = 'true'
const falseWildcard = 'false'

describe('convertDataList from array', () => {
    test('empty data, empty checked value', () => {
        const data = []
        const list = []
        const checkedItems = []
        expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
        expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toBe(data)
    })
    test('empty checked value', () => {
        const data = ['v1', 'v2']
        const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: false}]
        const checkedItems = []
        expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
    })
    test("empty checked value, presented empty value: '', null, undefined ", () => {
        const data = ['v1', 'v2', '', null, undefined]
        const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: false}, {value: emptyValueWildcard, label: emptyWildcard, checked: false}]
        const checkedItems = []
        expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
    })
    test("empty filter value, selectAll is true, presented true and false ", () => {
        const data = ['v1', 'v2', true, false]
        const list = [{value: 'v1', label: 'v1', checked: false}, {value: 'v2', label: 'v2', checked: false}, {value: true, label: trueWildcard, checked: false}, {value: false, label: falseWildcard, checked: false}]
        const checkedItems = []
        expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
    })

    test('not empty checked value', () => {
        const data = ['v1', 'v2']
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: false}]
        const checkedItems = ['v1']
        expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
    })
    test('empty value in data, not empty checked items with emptyValueWildcard', () => {
        const data = ['v1', 'v2', null, '', undefined]
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: false}, {value: emptyValueWildcard, label: emptyWildcard, checked: true}]
        const checkedItems = ['v1', emptyValueWildcard]
        expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
    })
    test('true and false in data, not empty checked items with true', () => {
        const data = ['v1', 'v2', true, false]
        const list = [{value: 'v1', label: 'v1', checked: true}, {value: 'v2', label: 'v2', checked: false}, {value: true, label: trueWildcard, checked: true}, {value: false, label: falseWildcard, checked: false}]
        const checkedItems = ['v1', true]
        expect(convertDataList({data, labelFieldName, valueFieldName, emptyWildcard, emptyValueWildcard, trueWildcard, falseWildcard, checkedItems})).toEqual(list)
    })

})

//*********************************************

// test converting checkedItems array
test("convertCheckedItemsArray, empty array", () => {
    const checkedItems = []
    const list = []
    expect(convertCheckedItemsArray({emptyValueWildcard, checkedItems})).toEqual(list)
})
test("convertCheckedItemsArray", () => {
    const checkedItems = ['v1', 'v2', undefined, '', true, false]
    const list = ['v1', 'v2', '', true, false]
    expect(convertCheckedItemsArray({emptyValueWildcard, checkedItems})).toEqual(list)
})
