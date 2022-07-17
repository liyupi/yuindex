import { defineStore } from "pinia";
import { SpaceItemType, SpaceType } from "./spaceCommands";

/**
 * 空间状态（类似文件系统实现）
 */
export const useSpaceStore = defineStore("space", {
  state: () => ({
    // 空间
    space: {
      // 默认包含根目录
      "/": {
        name: "/",
        dir: "/",
        type: "dir",
      },
    } as SpaceType,
    // 当前所在目录
    currentDir: "/",
  }),
  getters: {},
  // 持久化
  persist: {
    key: "space-store",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load spaceStore data start");
    },
    afterRestore: (context) => {
      console.log("load spaceStore data end");
    },
  },
  actions: {
    /**
     * 获取单条目
     * @param key
     */
    getItem(key: string) {
      const fullPath = getFullPath(this.currentDir, key);
      return this.space[fullPath];
    },
    /**
     * 获取某目录下的条目
     * @param dir 目录
     * @param recursive 是否递归
     */
    listItems(dir?: string, recursive = false): SpaceItemType[] {
      if (!dir) {
        dir = this.currentDir;
      } else {
        dir = getFullPath(this.currentDir, dir);
      }
      const resultList: SpaceItemType[] = [];
      // 父目录层级
      const parentDirDepth = getItemDepth(dir);
      // 查询 dir 下的 item
      for (const key in this.space) {
        // 不列举自身
        if (key === dir) {
          continue;
        }
        // 前缀必须匹配
        if (!key.startsWith(dir)) {
          continue;
        }
        // 不递归，只展示直接子级
        if (!recursive) {
          // 直接子级的 '/' 数比父级多 1
          if (getItemDepth(key) - 1 === parentDirDepth) {
            resultList.push(this.space[key]);
          }
        } else {
          resultList.push(this.space[key]);
        }
      }
      return resultList;
    },
    /**
     * 添加条目
     * @param item
     */
    addItem(item: SpaceItemType) {
      const fullPath = getFullPath(item.dir, item.name);
      // 目录不存在
      if (!this.space[item.dir]) {
        return false;
      }
      // 文件已存在 todo 支持覆盖
      if (this.space[fullPath]) {
        return false;
      }
      this.space[fullPath] = item;
      return true;
    },
    /**
     * 删除条目
     * @param key
     * @param recursive
     */
    deleteItem(key: string, recursive = false) {
      const fullPath = getFullPath(this.currentDir, key);
      // 目录不存在
      if (!this.space[fullPath]) {
        return false;
      }
      const deleteKeyList = [fullPath];
      // 需要递归删除
      if (recursive) {
        for (const spaceKey in this.space) {
          if (spaceKey.startsWith(fullPath)) {
            deleteKeyList.push(spaceKey);
          }
        }
      }
      // 移除属性
      deleteKeyList.forEach((deleteKey) => {
        delete this.space[deleteKey];
      });
      return true;
    },
    /**
     * 复制条目
     * @param source
     * @param target
     * @param recursive
     */
    copyItem(source: string, target: string, recursive = false) {
      // e.g. /a/b => /a/c
      const sourceFullPath = getFullPath(this.currentDir, source);
      const targetFullPath = getFullPath(this.currentDir, target);
      // 源条目不存在
      const sourceItem = this.space[sourceFullPath];
      if (!sourceItem) {
        return false;
      }
      // 复制目录必须开启递归
      if (sourceItem.type === "dir" && !recursive) {
        return false;
      }
      // todo 待实现递归
      // 目标条目已存在
      if (this.space[targetFullPath]) {
        return false;
      }
      // 目标目录不存在
      const targetParentDir = getParentDir(targetFullPath);
      if (!this.space[targetParentDir]) {
        return false;
      }
      const targetItem = { ...sourceItem };
      targetItem.dir = targetParentDir;
      targetItem.name = getItemName(targetFullPath);
      return this.addItem(targetItem);
    },
    /**
     * 移动条目（等同于复制 + 删除）
     * @param source
     * @param target
     * @param recursive
     */
    moveItem(source: string, target: string, recursive = false) {
      let result = this.copyItem(source, target, recursive);
      if (result) {
        result = this.deleteItem(source, recursive);
      }
      return result;
    },
    /**
     * 更新当前所在目录
     * @param newDir
     */
    updateCurrentDir(newDir: string) {
      let fullPath = getFullPath(this.currentDir, newDir);
      // 上层目录
      if (newDir === "..") {
        // 已经是根目录，无法到上层
        if (this.currentDir === "/") {
          return false;
        } else {
          fullPath = getParentDir(this.currentDir);
        }
      }
      // 目录不存在
      if (!this.space[fullPath]) {
        return false;
      }
      this.currentDir = fullPath;
      return true;
    },
  },
});

/**
 * 获得条目全路径
 * @param dir 目录
 * @param name 条目名称（位置）
 */
const getFullPath = (dir: string, name: string): string => {
  if (name.startsWith("/")) {
    return name;
  }
  return dir + (dir === "/" ? "" : "/") + name;
};

/**
 * 获取上层路径
 * @param path
 */
const getParentDir = (path: string): string => {
  let parentDir = "/";
  if (path === "/") {
    return parentDir;
  }
  // 切割掉最后一个 '/'
  // e.g. /a/b => /a
  parentDir = path.substring(0, path.lastIndexOf("/"));
  // 有可能回退到根目录
  // e.g. /a => ''（空字符串）
  if (!parentDir) {
    return "/";
  }
  return parentDir;
};

/**
 * 根据路径获取空间条目名
 * @param path
 */
const getItemName = (path: string): string => {
  if (path === "/") {
    return path;
  }
  // 从最后一个 '/' 开始取字符串
  // e.g. /a/b => b
  return path.substring(path.lastIndexOf("/") + 1);
};

/**
 * 获得条目层级
 * @param key
 */
const getItemDepth = (key: string) => {
  if (key === "/") {
    return 1;
  }
  return key.split("/").length;
};
