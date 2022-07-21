/**
 * 获取当前环境的配置
 * @author yupi
 */
let config;
const env = process.env.NODE_ENV ?? "local";

if (env === "local") {
  config = require("./config");
} else {
  config = require(`./config.${env}`);
}

module.exports = config;
