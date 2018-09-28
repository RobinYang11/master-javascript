
##  page.js v.1.0.0 
    原生javascript 分页插件
## 如何使用？
* 首先引入page.css 和 page.js
* 在body中创建dom结构
* 创建page实例

``` html
<link rel="stylesheet" href="./page.css">

<!--dom结构必须是下面这样-->
<div class="pagenation clearfix">
    <div class="wp fl"></div>
    <div class="go fl">
        <input type="text" />
        <button>go</button>
    </div>
</div>

<script src="./page.js"></script>
<script>
    var page = new page({
        root: '.pagenation',
        callback: function(a,b){console.log(a,b)},
        currentPage: 1,
        pageSize: 10,
        total: 223,
        showPage:10
    })
</script>
```

## API说明
<table>
    <tr>
        <td>属性</td>
        <td>类型</td>
        <td>作用</td>
    </tr>
    <tr>
        <td>root</td>
        <td> string</td>
        <td>css选择器,切记 只能是css选择器</td>
    </tr>
     <tr>
        <td>pageSize</td>
        <td>number</td>
        <td>每页显示数量</td>
    </tr>
    <tr>
        <td>total</td>
        <td>number</td>
        <td>总条数</td>
    </tr>
     <tr>
        <td>currentPage</td>
        <td>number</td>
        <td>当前页</td>
    </tr>
    <tr>
        <td>callback</td>
        <td>function(currentPage,pageSize)</td>
        <td>点击页码的回调函数,默认带2个参数.currentPage代表当前页，pageSize是每页的显示数量</td>
    </tr>
</table>

## issue 
if you find a bug , you can email me ,i will be very Appreciated that. 
:e-mail: robinyang880@gmail.com

## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2018-present, robin Yang


