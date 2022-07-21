const { CloudBaseRunServer } = require("./server");
const routes = require("./routes");

// 创建云托管 Server 实例
const server = new CloudBaseRunServer();

// 注册接口路由
for (const route of routes) {
  server.setRoute(route.path, route.handler);
}

// 监听端口
server.listen(7345);
