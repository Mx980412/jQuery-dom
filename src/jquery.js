window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  //重载
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    //如果是字符串
    if (selectorOrArrayOrTemplate[0] === "<") {
      //创建div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      //查找div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    //如果是数组
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }
  //api可以操作elements
  const api = Object.create(jQuery.prototype); //创建一个对象，这个对象的__proto__为括号里面的东西
  //const api ={__proto__ :jQuery.prototype}
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  });
  // api.elements= elements
  // api.oldApi = selectorOrArrayOrTemplate.oldApi
  return api;
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  get(index) {
    return this.elements[index];
  },
  appendTo(node) {
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el)); //遍历 elements，对每个 el 进行 node.appendChild 操作
    } else if (node.jquery === true) {
      this.each((el) => node.get(0).appendChild(el)); //遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
    }
  },
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
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
      //concat可以接受伪数组
    }
    array.oldApi = this; //this就是旧api
    return jQuery(array);
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, elements[i], i);
    }
    return this;
  },
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children); //..：可以把里面的伪数组拆开变成一个一个参数push进来
      //等价于array.push(node.children[0],node.children[1]...)
    });
    return jQuery(array);
  },
  print() {
    console.log(this.elements);
  },
  //闭包：函数访问外部的变量（addClass访问外部变量elements）
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      element.classList.add(className);
    }
    return this; //链式操作
  },
  end() {
    return this.oldApi; //this 是当前新的api (api2)
  },
};
