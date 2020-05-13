---
title api模块介绍
---
## 基础类
基于axios封装的类库, 可根据不同的模块传入不同的模块名，最终生成api实例，绑定到`this`中的`ApiObject`属性上。响应数据格式`{data,message,code}`，默认`code=200`时，说明请求成功，反则失败，并拦截弹出错误弹窗。

<<< @/src/index/Api/BaseApi.js

## 使用例子
<<< @/src/index/Api/test/index.js
