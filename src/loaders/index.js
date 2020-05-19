import axios from 'axios'

export const defaultDataLoader = async ({url, accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName}) => {
    try {
        const res = await axios.get(url, {
            params: {accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName}
        })
        if (!Array.isArray(res.data[dataFieldName])) {
            console.log('invalid data from server: ', res)
            throw new Error('Error fetching data from server')
        }
        return res.data
    } catch (e) {
        alert(e.toString())
        return {[dataFieldName]: []}
    }
}