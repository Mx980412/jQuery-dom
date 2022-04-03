const x = jQuery(".test");

x.children().print();
x.parent()
  .print()
  .find(".child")
  .addClass("red")
  .addClass("green")
  .addClass("blue")
  .end()
  .addClass("yellow");
x.each((div1, div2) => console.log(div1, div2));
// $("#test").find(".child").addClass("red"); // 请确保这句话成功执行
