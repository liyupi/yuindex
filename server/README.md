# YuIndex 后端

> 欢迎加入 [鱼皮的编程知识星球](https://yupi.icu/) ，获取完整的项目讲解，帮助你更好地学编程 ⭐️

## 技术栈

主要技术：

- Node.js
- Express、express-session
- MySQL
- Sequelize（ORM 框架）
- Redis

依赖库：

- Axios
- NeteaseCloudMusicApi

依赖服务：

- 百度翻译 API
- 新浪壁纸 API

### 为什么选 Node.js 做后端？

1. 相对 Java 启动更快、调试更方便
2. 对前端更友好（YuIndex 本身更侧重前端）

## 已支持特性

- 数据库访问
- 全局异常处理
- 全局响应包装
- 全局请求日志记录
- 跨域
- 用户登录及 session 分布式存储

## 快速开发

1）先修改 `src/config` 目录下的配置，可以新建 `config.prod.js` 用于线上环境。

比如：

```javascript
// MySQL 配置
dbConfig: {
  database: "yuindex",
  username: "root",
  password: "123456",
  host: "localhost",
  port: 3306,
},
```

2）安装依赖：

```
npm i 
```

3）启动服务：

以本地开发环境启动：

```
npm run start:dev
```

以线上环境启动：

```
npm run start
```

## 部署发布

支持前台进程运行或容器方式部署

### 容器部署

以微信云托管为例，也可以使用其他容器平台或原生 Docker 部署。

#### 1. 编写 Dockerfile

```dockerfile
# 使用官方 Node.js 轻量级镜像
# https://hub.docker.com/_/node
FROM node:16-slim

# 定义工作目录
WORKDIR /usr/src/app

# 将本地代码复制到工作目录内
COPY ./ ./

RUN npm install

# 安装 pm2
RUN npm install pm2 -g

# 启动服务
CMD pm2-runtime 'npm start'

```

#### 2. 上传代码包

将目录下所有文件压缩为 zip：

![](https://main.qcloudimg.com/raw/2f7b3d10472cb95f7a87691a679e1ef6.png)

进入微信云托管，创建环境和服务，然后发布一个版本。

- 上传方式为本地代码
- 附件类型为 ZIP 压缩包（即上一步中产生的压缩包）
- 监听端口为 7345

![](https://main.qcloudimg.com/raw/42ff035c940850d5e4b7915a0a17f40c.png)

随后点击确定，即可创建一个版本，后续发布流程可以参考微信云托管文档。

## 目录结构

- README.md 项目文档
- db 数据库相关
  - ddl.sql 建表语句
- src 源码
  - config 配置
    - config.js 默认配置
    - config.prod.js 线上配置
  - constant 常量
  - controller 接口层
  - dao 数据访问层
  - exception 异常处理
  - model 数据模型
  - service 业务逻辑
  - thirdpart 第三方依赖
  - utils 工具
  - test 测试
  - db.js 数据库
  - index.js 主文件
  - routes.js 接口注册
  - server.js 后台服务
- Dockerfile 镜像构建
- package.json 项目依赖文件
- yarn.lock 依赖锁定

