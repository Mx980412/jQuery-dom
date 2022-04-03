# jQuery封装DOM库

## 链式风格

- `window.jQuery()`：是我们提供的全局函数

## 特殊函数：`jQuery`

- `jQuery(选择器)`： 获取对应的元素

## 添加别名：`$`

- `window.$ = window.jQuery`

## 命名风格：`$div`

- `const $div = $('div#test')`

## 使用原型：`$.prototype`

- `$.fn = $.prototype`

## 查

- `$('#xxx')`：获取标签或标签们
- `$('#xxx').find('.red')`：查找元素里的元素（返回新的api对象）

- `$('#xxx').find('.red').end()`：返回上一个api操作
- `$('.red').each(fn)`：遍历并对每个元素执行fn

- `$('#xxx').print()`：打印当前的elements元素们
- `$('#xxx').parent()`：获取爸爸

- `$('#xxx').children()`：获取儿子
- `$('#xxx').siblings()`：获取兄弟

- `$('#xxx').index()`：获取排行老几（从0开始）
- `$('#xxx').next()`：获取弟弟

- `$('#xxx').prev()`：获取哥哥

## 增

- `$('<div><span>1</span></div>')`：创建 div
- `.appendTo(document.body)`：插入到body中

1. 1. 可以把新增的元素放到另一个元素里

- `$('body')`：获取 document.body
- `$('body').append($('<div>1</div>'))`：添加小儿子

- - `$('body').append('<div>1</div>')`（更方便）

- `$('body').prepend(div或$div)`：添加大儿子
- `$('#test').after(div 或 $div)`添个弟弟

- `$('#test').before(div 或 $div)`：添个哥哥 

## 删

- `$div.remove()`：删节点
- `$div.empty()`：删后代

## 改

- 读写文本内容：

- - 写：`$div.text(?)`
  - 读：`$div.text()`

- 读写HTML内容：

- - 写：`$div.html(?)`
  - 读：`$div.html()`

- 读写属性：

- - 写：`$div.attr('title', ?)`
  - 读：`$div.attr('title')`

- 读写style：

- - `$div.css({color: 'red'})`（css：操作内联的style）
  - `$div.style`（更好）

- 修改class：

- - 添加：`$div.addClass('blue')`
  - 删除：`$div.removeClass('blue')`

- - 读：`$div.hasClass()`

- 修改事件监听：

- - 添加：`$div.on('click', fn) `
  - 删除：`$div.off('click', fn)`

# jQuery的设计模式

## 不用new的构造函数

## 链式操作

1. 链式操作：返回值并不是元素，而是一个 api 对象

## 闭包隐藏细节

1. 用闭包隐藏细节设计模式

1. 1. 生成一个变量，用一个函数读这个变量

1. 闭包：函数访问外部的变量

## 重载

1. 重载：$(支持多种参数)

1. 1. 一个函数可以接受不同的参数

## 适配器

1. 适配器：jQuery 针对不同浏览器使用不同代码

## 读`getter` / 写`setter`

1. 读：没传参数
2. 写：传参数

1. 1. $div.text() 即可读也可写

## 别名

1. 别名：$.fn 是 $.prototype 的别名