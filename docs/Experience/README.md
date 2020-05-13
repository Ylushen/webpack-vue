---
title 遇到的问题
---

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
<script><%=require('raw-loader!babel-loader!./page/demo.js').default%></script>
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
兼容办法：`require('path').default`即可
> 如图所示：
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200425133908895.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzcxMTkxNw==,size_16,color_FFFFFF,t_70)



## 2. husky不触发生命周期钩子
#### 失效原因
安装husky之前，需要初始化git仓库。husky在安装前，会更改目录下git文件，添加钩子。
#### 解决办法
初始化仓库后，执行`npm rebuild husky`即可。<br>
由于使用husky出现问题，现改为`yorkie`和`script/verify-commit-msg.js`触发校验
#### 附录 ( commit规范 )
    Commit message 的格式
    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>

* feat: 新功能（feature）
* fix: 修复
* polish: 优化
* docs: 文档
* style: 样式
* refactor: 重构
* perf: 性能
* test: 测试
* workflow: 工作流程
* ci: 持续集成
* chore: 杂务
* types: 类型
* build: 构建


## 3. vue函数渲染跨层级传递具名插槽丢失
#### 失效代码
```javascript
render(createElement) {
    return createElement('el-input', {
      attrs: {
        ...this.$attrs,
        size: this.size
      },
      on: {
        ...this.$listeners
      }
      // 处理插槽作用域
    }, Object.keys(this.$slots).map(key => this.$slots[key])) 
}
// 传递进入后，具名插槽自动成了默认插槽，以至于el-input组件匹配不到
// 通过查看vue处理作用域源码如下
// 源码路径 https://github.com/Ylushen/studyVue/blob/master/src/core/instance/render-helpers/resolve-slots.js 下的resolveSlots方法

// 如果节点解析为Vue插槽节点，则删除插槽属性
if (data && data.attrs && data.attrs.slot) {
  delete data.attrs.slot
}
// 原因：具名插槽通过一级插槽传递之后，具名会被删除。
```
#### 解决办法
```javascript
// 更改代码如下
render(createElement) {
    return createElement('el-input', {
      attrs: {
        ...this.$attrs,
        size: this.size
      },
      on: {
        ...this.$listeners
      }
      // 处理插槽作用域
      // 在具名插槽外层包裹一层template,重新具名，然后传递进入下一层
    }, Object.keys(this.$slots).map(key => createElement('template', { slot: key }, this.$slots[key])))
}
```
## 4. position定位，左侧菜单固定，右侧自适应问题
#### 失效代码
```less
// 菜单栏
.ls-layout-menu {
  height: calc(100% - @LogoHeight);
  border-right: 1px solid #ebeef5;
  position: relative;
  transition: width @transition;
  /deep/ .el-menu {
    border: none;
  }
}
// 右侧自适应
.ls-layout-page {
  position: absolute;
  top: 0;
  transition: margin-left @transition;
}
```
#### 解决办法
```less
.ls-layout-menu {
  height: calc(100% - @LogoHeight);
  border-right: 1px solid #ebeef5;
  position: fixed; // 使用fixed定位
  transition: width @transition;
  /deep/ .el-menu {
    border: none;
  }
}
// 右侧自适应
.ls-layout-page {
  position: relative; // 使用相对定位relative，自动填充剩余空间
  transition: margin-left @transition;
}
```
