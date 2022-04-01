## 特殊函数：`jQuery`

- `jQuery(选择器)`： 获取对应的元素

## 添加别名：`$`

- `window.$ = window.jQuery`

## 命名风格

- `const $div = $('div#test')`

## 使用原型：`prototype`

- `$.fn = $.prototype`
- 让 `api.__proto__` 指向 `$.fn`

## 查

- `$('#xxx')`：返回值并不是元素，而是一个 api 对象
- `$('#xxx').find('.red')`：查找 #xxx 里的 .red 元素

- `$('#xxx')..addClass('red')`：添加red元素
- `$('#xxx').print()`：打印当前的elements

- `$('#xxx').parent()`：获取爸爸
- `$('#xxx').children()`：获取儿子

- `$('#xxx').siblings()`：获取兄弟
- `$('#xxx').index()`：获取排行老几（从0开始）

- `$('#xxx').next()`：获取弟弟
- `$('#xxx').prev()`：获取哥哥

- `$('.red').each(fn)`：遍历并对每个元素执行 fn

## 增

- `$('<div><span>1</span></div>')`：创建 div
- `.appendTo(document.body)`：可以把新增的元素放到另一个元素里

- `$('body')`：获取 document.body
- `$('body').append($('<div>1</div>'))`：添加小儿子

- - `$('body').append('<div>1</div>')`（更方便）

- `$('body').prepend(div或$div)`：添加大儿子
- `$('#test').after(div 或 $div)`添个弟弟

- `$('#test').before(div 或 $div)`：添个哥哥 

## 删

- `$div.remove()`：删除节点
- `$div.empty()`：删除后代

## 改

- `$div.text(?)`：读写文本内容
- `$div.html(?)`：读写 HTML 内容

- `$div.attr('title', ?)`：读写属性
- `$div.css({color: 'red'})`：读写 style

- - `$div.style`（更好）

- `$div.addClass('blue')`：读写class

- - `removeClass`
  - `hasClass`

- `$div.on('click', fn) `：添加事件监听
- `$div.off('click', fn)`：删除事件监听