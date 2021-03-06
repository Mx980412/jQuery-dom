window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  //【重载】
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      //创建 div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      //查找 div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }

  //api可以操作elements
  const api = Object.create(jQuery.prototype); //创建一个对象，这个对象的__proto__为括号里面的东西
  //相当于const api = {__proto__: jQuery.prototype}
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  });
  //api.elements = elements
  //api.oldApi = selectorOrArrayOrTemplate.oldApi
  return api;
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  //【闭包】
  get(index) {
    return this.elements[index];
  },
  //可以把新增的元素放到另一个元素里
  appendTo(node) {
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el)); //遍历elements，对每个el进行node.appendChild操作
    } else if (node.jquery === true) {
      this.each((el) => node.get(0).appendChild(el)); //遍历elements，对每个el进行node.get(0).appendChild(el))操作
    }
  },
  //添加小儿子
  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery === true) {
      children.each((node) => this.get(0).appendChild(node));
    }
  },
  //查找元素里的元素
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }
    array.oldApi = this; //this:旧api
    return jQuery(array);
  },
  //遍历并对每个元素执行fn
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  //获取爸爸
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        //如果元素不存在就push
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  //获取儿子
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children); //...：展开操作符（把伪数组拆开变成一个一个参数push进来）
    });
    return jQuery(array);
  },
  //打印当前的elements元素们
  print() {
    console.log(this.elements);
  },
  //添加class元素
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      element.classList.add(className);
    }
    return this;
  },
  //返回上一个api操作
  end() {
    return this.oldApi; //this:新api
  },
};
