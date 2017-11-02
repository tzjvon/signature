## Signature

使用
```js
var Sg = new Signature(opts)
```

参数解析
```
opts.el 		// 是一个canvas对象，或者class，或者id
opts.offsetX 	// 横向偏移量 ，当对样式进行transform：translateX时，需要次属性进行修正
opts.offsetY 	// 同上
opts.color 		// 设置线条的颜色
opts.width 		// 设置线条的宽度
opts.cap 		// lineCap
opts.lineJoin 	// lineJoin

```

方法
```
setColor(color) 	// 设置颜色， 参数必须为字符串
setWidth(width) 	// 设置宽度, 参数必须为数字
clear() 	// 清除画布
lock() 		// 锁住画布
unlock() 	// 解锁画布
destroy() 	// 移除事件和释放内存
```