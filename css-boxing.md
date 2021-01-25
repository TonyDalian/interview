# CSS box model 盒模型
  box-sizing:

  content-box default
  border-box  include border + padding

  content-box gives you the default CSS box-sizing behavior. 
  If you set an element's width to 100 pixels, 
  then the element's content box will be 100 pixels wide, 
  and the width of any border or padding will be added to the final rendered width, 
  making the element wider than 100px.

  border-box tells the browser to account for any border and padding in the values 
  you specify for an element's width and height. 
  If you set an element's width to 100 pixels, 
  that 100 pixels will include any border or padding you added, 
  and the content box will shrink to absorb that extra width. 
  This typically makes it much easier to size elements.
## Block box
  一个被定义成块级的（block）盒子会表现出以下行为:

  盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
  每个盒子都会换行
  width 和 height 属性可以发挥作用
  内边距（padding）, 外边距（margin） 和 边框（border） 会将其他元素从当前盒子周围“推开”

  eg: h1 p
## Inline box
  如果一个盒子对外显示为 inline，那么他的行为如下:

  盒子不会产生换行。
  width 和 height 属性将不起作用。
  垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
  水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。
## inline-block
  Compared to display: 
  inline, the major difference is that display:
  1. inline-block allows to set a width and height on the element.
  2. the top and bottom margins/paddings are respected, 
    but with display: inline they are not.

  Compared to display: 
  inline-block does not add a line-break after the element, 
  so the element can sit next to other elements.

# Position
  static
  该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。
  此时 top, right, bottom, left 和 z-index 属性无效。

  relative
  元素先放置在未添加定位时的位置，在不改变页面布局的前提下调整元素位置
  （因此会在此元素未添加定位时所在位置留下空白）。
  position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption 元素无效。
  
  absolute
  元素会被移出正常文档流，并不为元素预留空间，
  通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。
  绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

  fixed
  元素会被移出正常文档流，并不为元素预留空间，
  而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。
  元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。

  sticky
  nav bar 不随滚动条动 
  粘性定位常用于定位字母列表的头部元素。
  元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，包括table-related元素，基于top, right, bottom, 和 left的值进行偏移。偏移值不会影响任何其他元素的位置。
  该值总是创建一个新的层叠上下文（stacking context）。注意，一个sticky元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的overflow 是 hidden, scroll, auto, 或 overlay时），即便这个祖先不是最近的真实可滚动祖先。这有效地抑制了任何“sticky”行为（详情见Github issue on W3C CSSWG）

# overflow
  overflow: visible; 
  /* 默认值。内容不会被修剪，会呈现在元素框之外 */ 
  overflow: hidden; 
  /* 内容会被修剪，并且其余内容不可见 */ 
  overflow: scroll; 
  /* 内容会被修剪，浏览器会显示滚动条以便查看其余内容 */ 
  overflow: auto; 
  /* 由浏览器定夺，如果内容被修剪，就会显示滚动条 */ 
  overflow: inherit;
  /* 规定从父元素继承overflow属性的值 */ 

# 伪类伪元素
## pseudo-class
  :first-child
  :last-child
  :focus
  :hover
  :active
  :not
  :nth-child
  :nth-of-type
  :first-of-type
  //表示一组兄弟元素中其类型的第一个元素。
  p:first-of-type {
    color: red;
  }
## pseudo-element
  ::first-line
  ::before
  ::after (content属性一同使用)
  .box::after {
      content: " ➥"
  }  
  
  “生成内容”
  .box::before {
      content: "";
      display: block;
      width: 100px;
      height: 100px;
      background-color: rebeccapurple;
      border: 1px solid black;
  }  

  article p:first-child::first-line {
    font-size: 120%;
    font-weight: bold;
  }
