## 1. webpack使用raw-loader内联静态资源失效
#### 失效代码
```html
<script>${ require('raw-loader!babel-loader!./page/demo.js') }</script>
```
#### 原因及解决办法
由于html-webpack-plugin解析语法的改变，将`${ "code" }`写法改为了`<%= "code" %>`
将原有的写法改为新写法即可
```html
<!--由于html-webpack-plugin解析语法的改变，将${ "代码" }标识符改为了<%= "代码" %>-->
<script><%=require('raw-loader!babel-loader!./page/demo.js')%></script>
```
顺便说一下`raw-loader@0.5.1`，对比了一下raw-loader新版本的源码。发现问题出在导出语法上。
新版本的raw-loader，[默认情况下，raw-loader生成使用ES模块语法的JS模块](https://www.npmjs.com/package/raw-loader)。
 - 老版本 0.5.1
	```javascript
	module.exports = function(content) {
		this.cacheable && this.cacheable();
		this.value = content;
		// 0.5.1导出方式
		return "module.exports = " + JSON.stringify(content);
	}
	```
- 新版本
	```javascript
	function rawLoader(source) {
	  const options = (0, _loaderUtils.getOptions)(this);
	  (0, _schemaUtils.default)(_options.default, options, {
	    name: 'Raw Loader',
	    baseDataPath: 'options'
	  });
	  const json = JSON.stringify(source).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
	  // 将true 改为false
	  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : true;
	  /*const esModule = typeof options.esModule !== 'undefined' ? options.esModule : false;*/
	  // esModule 控制导出方式
	  return `${esModule ? 'export default' : 'module.exports ='} ${json};`; 
	}
	```
兼容办法：在node_modules中找到`raw-loader/dist/index`中将esModule的默认值改为false即可
> 如图所示：
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200425133908895.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzcxMTkxNw==,size_16,color_FFFFFF,t_70)



## 2. husky不触发生命周期钩子
#### 失效原因
安装husky之前，需要初始化git仓库。husky在安装前，会更改目录下git文件，添加钩子。
#### 解决办法
初始化仓库后，执行`npm rebuild husky`即可。
#### 附录 ( commit规范 )
    Commit message 的格式
    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>

* upd：更新某功能（不是 feat, 不是 fix）
* feat：新功能（feature）
* fix：修补bug
* docs：文档（documentation）
* style： 格式（不影响代码运行的变动）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：增加测试
* chore：构建过程或辅助工具的变动
