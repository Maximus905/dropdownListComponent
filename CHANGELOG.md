## 1.0.5
* introduced new properties - __labelFieldName__ and __valueFieldName__
* data from server (dataLoader) now can be not only as array of values, but array of objects too. __labelFieldName__ and __valueFieldName__ property define names for key and value fields in object. For example:

  * this is data as array:
  ```javascript
  ['label 1', 'label 2', 'label N']
  ```
  * this is data as array of objects when valueFieldName = 'val' and labelFieldName = 'lab' (it's default values for these props):
  ```javascript
  [{val: 'val-1', lab: 'label 1'}, {val: 'val-n', lab: 'label N'}]
  ``` 
## 1.0.6
* added property __label__ to event handlers *onChangeSelected* and *onClose*. This is array of checked items label.
## 1.0.7
* added __disabled__ property. Default value __false__
## 1.0.8
* disabled location and distance for Fuse
## 1.0.9
* removed legacy fuse options
## 1.0.10
* removed unnecessary console commands
## 1.0.11
* changing filters causes reset of data 