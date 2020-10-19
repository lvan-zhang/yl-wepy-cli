## 使用 upload 组件

| props       | 解释                                                                 | 类型   | 默认值 |
| ----------- | -------------------------------------------------------------------- | ------ | ------ |
| maxCount    | 最多可上传几张图                                                     | Number | 6      |
| placeholder | 备注内容                                                             | String |        |
| list        | 初始化的图片列表（约定使用这种格式[{"imageUrl":"","imageCode":""}]） | Array  | []     |
| imageType   | 图片类型                                                             | String |        |

获取上传组件的图片列表方法
<upload ref="upload"></upload>

// js
this.\$refs.upload.imageList
