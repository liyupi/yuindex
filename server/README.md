# YuIndex 后端

## 技术栈

- Node.js
- Express
- MySQL
- Redis

### 为什么选 Node.js 做后端？

1. 相对 Java 启动更快、调试更方便
2. 对前端更友好（YuIndex 本身更侧重前端）


## 快速开发

安装依赖：

```
yarn
```

启动服务：

以测试环境启动：

```
npm run start:dev
```

以线上环境启动：

```
npm run start
```

## 部署发布

### 编写 Dockerfile

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

### 上传代码包

将目录下所有文件压缩为 zip：

![](https://main.qcloudimg.com/raw/2f7b3d10472cb95f7a87691a679e1ef6.png)

进入微信云托管，创建环境和服务，然后发布一个版本。

- 上传方式为本地代码
- 附件类型为 ZIP 压缩包（即上一步中产生的压缩包）
- 监听端口为 3000

![](https://main.qcloudimg.com/raw/42ff035c940850d5e4b7915a0a17f40c.png)

随后点击确定，即可创建一个版本，后续发布流程可以参考微信云托管文档。

