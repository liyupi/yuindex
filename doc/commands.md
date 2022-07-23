# YuIndex 命令大全

⭐️ 在终端内使用 [help 命令英文名] 可以查询某命令的具体用法，如：help search

⭐️ 使用 `shortcut` 可以查看所有的快捷键。



## 检索类

快速从不同网站检索内容



#### search 网页搜索

介绍：支持从不同平台快捷搜索内容

别名：s, sousuo, sou, query

用法：search <搜索内容> [-f from] [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -f, --from 可选 默认：baidu
- -s, --self 可选 是否当前页面打开



#### baidu 百度搜索

用法：baidu <搜索内容> [-s 是否当前页面打开] [-p 是否搜索图片]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开
- -p, --picture 可选 是否搜索图片



#### baidudev 百度开发者搜索

别名：dev

用法：baidudev <搜索内容> [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开



#### bilibili bilibili 搜索

别名：bzhan, bili

用法：bilibili <搜索内容> [-s 是否当前页面打开] [-b B站视频id]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开
- -b, --bvid 可选 B站视频id



#### bing 必应搜索

用法：bing <搜索内容> [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开



#### github GitHub 搜索

用法：github <搜索内容> [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开



#### douban 豆瓣搜索

用法：douban <搜索内容> [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开



#### douyin 抖音搜索

用法：douyin <搜索内容> [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开



#### google Google 搜索

用法：google <搜索内容> [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开



#### wangyiyun 网易云搜索

用法：wangyiyun <搜索内容> [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开



#### zhihu 知乎搜索

用法：zhihu <搜索内容> [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开



#### geng 梗搜索

别名：xiaoji

用法：geng <搜索内容> [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开



#### codenav 编程资源搜索

用法：codenav <搜索内容> [-s 是否当前页面打开]

参数：

- word 必填 搜索内容

选项：

- -s, --self 可选 是否当前页面打开



## 空间

像管理文件一样管理你的常用网站



#### list 列举空间条目

别名：ls

用法：list [目录] [-r 是否递归列举]

参数：

- dir 可选 目录

选项：

- -r, --recursive 可选 是否递归列举



#### remove 删除空间条目

别名：rm, delete, del

用法：remove <要删除的条目路径> [-r 是否递归删除] [-f 是否强制删除]

参数：

- item 必填 要删除的条目路径

选项：

- -r, --recursive 可选 是否递归删除
- -f, --force 可选 是否强制删除



#### add 新增空间条目

别名：touch, new

用法：add <-n 条目名称> <-l 链接> [-d 目标目录]

选项：

- -n, --name 必填 条目名称
- -l, --link 必填 链接
- -d, --dir 可选 目标目录



#### mkdir 创建空间目录

用法：mkdir <新目录路径>

参数：

- dir 必填 新目录路径



#### pwd 显示当前空间位置

用法：pwd



#### cd 切换空间目录

用法：cd <目标目录>

参数：

- dir 必填 目标目录



#### move 移动空间条目

用法：move <来源路径> <目标路径> [-r 是否递归移动]

参数：

- source 必填 来源路径
- target 必填 目标路径

选项：

- -r, --recursive 可选 是否递归移动



#### copy 复制空间条目

别名：cp

用法：copy <来源路径> <目标路径> [-r 是否递归复制]

参数：

- source 必填 来源路径
- target 必填 目标路径

选项：

- -r, --recursive 可选 是否递归复制



## 用户

用法：user <子命令>

子命令：

- login 用户登录
- register 用户注册
- logout 用户注销

参数：

- subCommand 必填 子命令



#### 用户注册

用法：user register <-u 用户名> <-p 密码> <-e 邮箱>

选项：

- -u, --username 必填 用户名
- -p, --password 必填 密码
- -e, --email 必填 邮箱



#### 用户登录

用法：user login <-u 用户名> <-p 密码>

选项：

- -u, --username 必填 用户名
- -p, --password 必填 密码



#### 用户注销

用法：user logout



## 工具

#### goto 网页跳转

别名：to, open, visit, jump

用法：goto <目标链接> [-s 是否当前页面打开]

参数：

- link 必填 目标链接

选项：

- -s, --self 可选 是否当前页面打开



#### fanyi 翻译

用法：fanyi <要翻译的内容> [-f 源语言] [-t 目标语言]

参数：

- word 必填 要翻译的内容

选项：

- -f, --from 可选 默认：auto 源语言
- -t, --to 可选 默认：auto 目标语言



#### todo 待办事项

用法：todo <子命令>

子命令：

- add 添加任务

参数：

- subCommand 必填 子命令



#### 添加任务

用法：todo add <-n 任务名称>

选项：

- -n, --name 必填 任务名称



#### timing 定时器

用法：timing <-s 秒数>

选项：

- -s, --seconds 必填 秒数



#### date 日期

用法：date



#### ping 网络检测

介绍：检测某个地址是否存活

用法：ping <目标地址>

参数：

- dest 必填 目标地址



#### ddos

介绍：发起网络攻击，慎用！

用法：ddos



## 终端相关

### 终端操作

#### clear 清屏

别名：cl

用法：clear

快捷键：Ctrl + L



#### history 查看执行历史

别名：h

用法：history



#### help 查看帮助

别名：man

用法：help [命令英文名称]

参数：

- commandName 可选 命令英文名称



#### info 查看本站信息

别名：author, about

用法：info



#### shortcut 快捷键

介绍：查看快捷键

用法：shortcut



### 终端配置

#### background 切换终端背景

别名：bg

用法：background [图片地址（不填则随机）]

参数：

- url 可选 图片地址（不填则随机）



#### reset 重置终端配置

用法：reset



#### hint 开关提示

开启 / 关闭输入提示



## 休闲娱乐

#### music 音乐

介绍：在线听音乐

用法：music <音乐名称>

参数：

- name 必填 音乐名称



#### moyu 摸鱼

用法：moyu



#### ikun 坤坤

用法：ikun

