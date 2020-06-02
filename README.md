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
* __accessor__: this property is sent to server and can be used for getting data on the server side;
* __filters__: this property is sent to server and can be used for filtering data on the server side;
* __sorting__: this property is sent to server and can be used for ordering data on the server side;

* __selected__: array of values that will be checked in the list at the first time after fetching data from server

* __disabled__: true/false. Enable/disable component

* __buttonContainerWidth__: define the width of button in container. See demo code as example. 

  Interpretation of values: 100 -> 100px, '50%' -> '50%'
* __multiSelect__: if __true__ available multi selection in the list. Default value: __false__ 
* __applyInstantly__: if __true__ a method __onChangeSelected__ will be invoked just after selection, else this method will be invoked after closing of list
* __closeAfterSelect__: __true/false__. CLose or not drop down list after clicking on item
* __maxHeight__: PropTypes.number, // maxHeight of dropdown list in px
* __maxWidth__: PropTypes.number, // maxWidth of dropdown list in px
* __minWidth__: PropTypes.number, //minWidth of dropdown list
* __widthMenuLikeButton__: PropTypes.bool, // if true - set dropdown's menu width as button width
* __flip__: PropTypes.bool,
* __rightAlignment__: PropTypes.bool, // right alignment if true, else left alignment
* __fontRatio__: PropTypes.number, to increase or decrease font size of component. Default value: __1__
* __labelFieldName__: PropTypes.string. This is used if a server's response is array of objects
* __valueFieldName__: PropTypes.string. This is used if server's response is array of objects
* __emptyWildcard__: PropTypes.string. Default value: __'<пусто>'__ 
* __emptyValueWildcard__: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]). Default value: __''__
* __falseWildcard__: PropTypes.string. Default value: __'false'__
* __trueWildcard__: PropTypes.string. Default value: __'true'__
* __emptyListWildcard__: PropTypes.string. Default value: __'нет элементов'__
* __loadingWildcard__: PropTypes.string. Default value: __'loading...'__
* __opened__: PropTypes.bool, //initial state of filter. Doesn't work yet.
* __buttonIcon__: React component. Will be rendered as button of DD list.
  * Next list of props are passed into __buttonIcon__:
    * buttonRef - should be assigned to buttonIcon as a ref,
    * checkedItemsValue - array of checked items value. Using of this prop is up to you,
    * checkedItemsLabel - array of checked items labels. Using of this prop is up to you.
  * Example of custom icon for DD list (*reactstrap* and *fortawesome* libraries are used):
  ```javascript
  const ListButton = ({buttonRef, checkedItemsValue, checkedItemsLabel}) => {
      return (
          <Button className="d-flex" css={css`width: 100%`} innerRef={buttonRef} size='sm' >
              <div className="flex-grow-1 text-truncate" title={checkedItemsLabel.length > 0 ? checkedItemsLabel.join(',') : ''}>
                  {checkedItemsLabel.length > 0 ? checkedItemsLabel.join(',') : 'select Item'}
              </div>
              <div className="flex-grow-0 pl-1"><FontAwesomeIcon icon={faAngleDown} /></div>
          </Button>
      )
  }
  ```
##### handlers:
* __onChangeSelected__: PropTypes.func
  * Default value:
  ```javascript
  ({accessor, value, label}) => {console.log('onChangeSelected', {accessor, value, label})}
  ```
* __onOpen__: PropTypes.func
  * Default value:
  ```javascript
  ({accessor}) => console.log('onOpen', {accessor})
  ```
* __onClose__: PropTypes.func
  * Default value:
  ```javascript
  ({accessor, value, label}) => console.log('onClose', {accessor, value, label})
  ```  

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
