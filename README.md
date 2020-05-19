# component

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

#### List of properties that are used in component:
* __dataUrl__: URL for getting data from a server;
* __dataFieldName__: server's response should look like {[dataFieldName]: data};
* __dataLoader__: async function for fetching data from server.
 
   Example of default loader function:
   ```javascript
      const defaultDataLoader = async ({url, accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName}) => {
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
   ```
* __accessor__: this field can be used for getting data on the server side;
* __filters__: this field can be used for filtering data on the server side;
* __sorting__: this field can be used for ordering data on the server side;

* __selected__: array of values that will be checked in the list at the first time after fetching data from server

* __buttonContainerWidth__: define the width of button in container. See demo code as example. 

  Interpretation of values: 100 -> 100px, '50%' -> '50%'
* __multiSelect__: if __true__ available multi selection in the list. Default value: __false__ 
* __applyInstantly__: if __true__ a method __onChangeSelected__ will be invoked just after selection, else this method will be invoked after closing of list
* __closeAfterSelect__: __true/false__. CLose or not drop down list after clicking on item
*    maxHeight: PropTypes.number, // maxHeight of dropdown list in px
*    maxWidth: PropTypes.number, // maxWidth of dropdown list in px
*    minWidth: PropTypes.number, //minWidth of dropdown list
*    widthMenuLikeButton: PropTypes.bool, // if true - set dropdown's menu width as button width
*    flip: PropTypes.bool,
*    rightAlignment: PropTypes.bool, // right alignment if true, else left alignment
    //handlers
*    onChangeSelected: PropTypes.func, // every time when filter changes
*    onOpen: PropTypes.func,
*    onClose: PropTypes.func,
    //
*    fontRatio: PropTypes.number,

*    labelFieldName: PropTypes.string, // if server's response is array of objects
*    valueFieldName: PropTypes.string, // if server's response is array of objects
*    emptyWildcard: PropTypes.string,
*    emptyValueWildcard: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
*    falseWildcard: PropTypes.string,
*    trueWildcard: PropTypes.string,
*    emptyListWildcard: PropTypes.string,
*    loadingWildcard: PropTypes.string,

*    opened: PropTypes.bool, //initial state of filter. Doesn't work yet.

*    buttonIcon: PropTypes.any, 

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
