const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const redis = require("redis");
const { redisConfig } = require("./config/getConfig");
const MyError = require("./exception");
const http = require("http");
const { FORBIDDEN_ERROR_CODE } = require("./exception/errorCode");
const morgan = require("morgan");
const RedisStore = require("connect-redis")(expressSession);

// 创建Redis连接配置
const redisClient = redis.createClient(redisConfig);
redisClient.on("connect", function () {
  console.log("Redis client connected");
});
redisClient.on("error", function (e) {
  console.error(e);
});

// 请求大小限制
const requestLimit = "5120kb";

class ExpressServer {
  constructor() {
    this.app = express();
    // 上下文请求路径
    this.contextPath = "/api";
    // 请求日志
    this.app.use(morgan("short"));
    this.app.use(
      bodyParser.urlencoded({ extended: false, limit: requestLimit })
    );
    this.app.use(bodyParser.json({ limit: requestLimit }));
    this.app.set("x-powered-by", false);
    this.app.all("*", (req, res, next) => {
      // 开启跨域
      res.setHeader("Access-Control-Allow-Credentials", "true");
      const origin = req.get("Origin");
      // 允许的地址 http://127.0.0.1:9000 这样的格式
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      // 允许跨域请求的方法
      res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, DELETE, PUT"
      );
      // 允许跨域请求 header 携带哪些东西
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since"
      );
      next();
    });
    // 设置Express的Session存储中间件(跟之前session设置方法一样，只加了store项为redis存储)
    const sessionOptions = {
      // store session存储实例，默认为一个新的 MemoryStore 实例。
      store: new RedisStore({ client: redisClient }), // 只需设置这个就可存储到redis
      name: "session_id", // 默认connect.sid
      secret: "yupi", // 设置签名秘钥  内容可以任意填写
      resave: false, // 强制保存，如果session没有被修改也要重新保存,默认true(推荐false)
      saveUninitialized: true, // 如果原先没有session那么就设置，否则不设置(推荐true)
      rolling: true, // 每次请求更新有效时长
      cookie: {
        // domain: ".yuindex.com", // 需要共享 cookie 时再设置
        // 全局设置 cookie，就是访问随便 api 就会设置 cookie，也可以在登录的路由下单独设置
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 天后过期
        httpOnly: true, // 是否允许客户端修改 cookie（默认 true 不能被修改）
      },
    };
    this.app.use(expressSession(sessionOptions));
    this.server = http.createServer(this.app);
  }

  setRoute(path, handlerFunction) {
    const handler = async (req, res) => {
      // IP 过滤
      const requestClientIp = getClientIp(req);
      if (!requestClientIp) {
        return FORBIDDEN_ERROR_CODE;
      }
      const event = req.body;
      let result;
      try {
        const startTime = new Date().getTime();
        let params;
        if (event.file) {
          let eventCopy = { ...event };
          eventCopy.file = undefined;
          params = JSON.stringify(eventCopy);
        } else {
          params = JSON.stringify(event);
        }
        console.log(
          `req start path = ${req.path}, clientIp = ${requestClientIp}, params = ${params}`
        );
        result = await handlerFunction(event, req, res);
        // 封装响应
        result = {
          code: 0,
          data: result,
        };
        console.log(
          `req end path = ${
            req.path
          }, clientIp = ${requestClientIp}, params = ${params}, costTime = ${
            new Date().getTime() - startTime
          }`
        );
      } catch (e) {
        // 全局异常处理
        if (e instanceof MyError) {
          result = {
            code: e.code,
            message: e.message,
            data: null,
          };
        } else {
          result = {
            code: 500,
            data: null,
            message: "server error",
          };
        }
        console.error(
          `req error path = ${
            req.path
          }, clientIp = ${requestClientIp}, params = ${JSON.stringify(event)}`,
          e
        );
      }
      res.send(result);
    };
    this.app.post(this.contextPath + path, handler);
  }

  listen(port) {
    this.server.listen(port);
    let url = `http://localhost:${port}`;
    if (this.contextPath) {
      url += this.contextPath;
    }
    console.log(`server start at ${url}, env = ${process.env.NODE_ENV}`);
  }
}

/**
 * 获取真实客户端 ip
 * @param req
 * @returns {*|string}
 */
function getClientIp(req) {
  if (!req) {
    return "";
  }
  return (
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress ||
    req.ip
  );
}

module.exports.CloudBaseRunServer = ExpressServer;
