# nest-init 项目初始化模板

## 简介

基于 nest 基础脚手架的二次开发，集成了一些基本功能、组件的模板

助你快速启动一个初始化完备的 nest 应用



本模板基于 nest@9，详情请查看 [https://nestjs.com](https://nestjs.com)



## 本模板已支持的基本能力、组件

- 基础 CURD
- 跨域 crossDomain
- 状态码封装
- 基础工具
- Typeorm
- Redis
- RabbitMQ
- JWT
- Cron



## 快速使用

##### 安装依赖

```bash
$ npm i
```

##### 检查支持的能力、组件及配置

1. 检查需要启用的组件，查看 app.module.ts 文件
2. 检查需要启用组件的调整配置，查看 src/config/* 文件

##### 启动运行

```
$ npm run start:dev
$ open http://localhost:3001
```



## PS

本模板暂未集成的能力和组件，请查看 nest 官方文档
