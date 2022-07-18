# YuIndex - 极客范儿的浏览器主页

> Coolest browser index for geeks!
> 
> by 程序员鱼皮

all in one 

在一个终端里做所有的事情（极客风）

我做了个很特别的浏览器主页 yuindex

优势：无需任何鼠标操作，极简！！！
Linux 的原汁原味儿~
复习 Linux 命令
感受到编程的乐趣

在线体验：[https://yuindex.com](https://yuindex.com)

## 项目优势

### 用户

### 开发者

### 学习者

## 功能和特性

输入提示

## 技术栈

vue 3 + vite 2 + xterm.js 4.x + pinia

库：getopts



## 系统设计

- 文件系统
- 微终端
- 命令系统

（补充一张图，核心设计 —— 命令系统和微终端如何交互）

### 微终端

概念：

- 命令输入 
- 输出（自定义状态）
  - 命令类型：命令 + 结果列表（输出）
  - 文本类型
  - 自定义组件类型

快捷键 ✅
开放接口 ✅


### 命令系统

子命令


### 命令集

### 网站跳转

goto / open / visit / to / jump 打开链接（支持传入网址和收藏网站中文名）

### 搜索

`s` 搜索网站，别名 `search` / `sou` / `sousuo` 

bilibili
zhihu
douyin
github
codenav
wangyiyun
douban
baidudev
bing

补充参数

-f --from 来源
-t --time 时间
-s --site 站点
-f --file 文件类型

补充快捷键

`baidu` 快速百度


### 空间

ls 展示收藏，别名 list / list

add touch shoucang 添加收藏（传入网址、

rm

mkdir 目录

cd 跳转目录

把网页链接像文件一样管理 rm mkdir touch

### 下载

download 别名 down / xiazai

下载 B 站、下载音乐等

### 登录

login

### 热榜

### 其他

history

bg background 快速切换壁纸

time（倒计时）
clock（提醒）

help, cao

music 播放音乐

todoList

小游戏


### 翻译

### 聊天



## 设计理念

侧重于前端实现，能不请求后端就不请求（并发、安全性）

命令系统实现

space 命令：类似文件系统

自实现控制台

## 如何开发扩展？

（alias 系统）

添加扩展？？？

## 生态

命令手册

扩展商店

自动生成扩展基础代码

自动生成文档


## 更多功能

自定义快捷键

登录

本地收藏、云同步

快捷清屏 ✅

识别超链接（小工具）✅

查看历史 ✅

todo ！快速执行命令 ✅

空间 list 递归优化

定时模块，支持绝对日期、支持天等

查看历史持久化

空间支持上传和下载文件

递归复制 / 递归移动支持

【自定义命令】（比如自定义搜索引擎）、配置默认值

## 感受

为什么弃用 xterm.js ？文档比较少，问题难解决！
