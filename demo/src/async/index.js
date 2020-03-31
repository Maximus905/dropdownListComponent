export const dropdownListData = async (amount) => {
    const data = Array.from(Array(amount || 10), () => 0).map((value, index) => `item ${index}`)
    console.log('data', data)
    return new Promise(resolve => {
        setTimeout(() => {resolve(data)}, 500)
    })
}
