![npm version](https://img.shields.io/badge/npm-1.0.0-brightgreen)
 > 利用谷歌 localStorage 同源进程会同步消息的特性做的消息管理器，觉得小弟写的还行的话，就给个[Star](https://github.com/mytwz/storage-emitter-js)⭐️吧~

## 使用说明

#### 网页食用方式
```html
<!-- 网页A -->
<script src="./build/storageemitter-js.min.js"></script>
<script>
StorageEmitter.on("test"， function(a, b, c){
    console.log({a, b, c});// { a:123, b: 234, c: 345 }
})
</script>

<!-- 网页B -->
<script src="./build/storageemitter-js.min.js"></script>
<script>
// 事件绑定
StorageEmitter.on("test"， function(a, b, c){
    console.log({a, b, c});// { a:123, b: 234, c: 345 }
})
//这个方法会触发当前网页的绑定方法
StorageEmitter.emits("test", 123, 234, 345)
//这个方法会触发当前以外的同源网页绑定方法
StorageEmitter.emit("test", 123, 234, 345)
</script>
```

#### Webpack/vue/react 食用方式
```javascript
// npm i -s storage-emitter-js
```

谢谢