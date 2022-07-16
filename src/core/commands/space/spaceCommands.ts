import listCommand from "./listCommand";
import removeCommand from "./removeCommand";
import addCommand from "./addCommand";
import mkdirCommand from "./mkdirCommand";
import pwdCommand from "./pwdCommand";
import cdCommand from "./cdCommand";
import moveCommand from "./moveCommand";
import copyCommand from "./copyCommand";

/**
 * 空间类型（扁平）
 */
export interface SpaceType {
  [dir: string]: SpaceItemType;
}

/**
 * 空间项类型
 */
export interface SpaceItemType {
  // 条目 / 目录名
  name: string;
  link?: string;
  // 所属目录
  dir: string;
  type: "dir" | "link";
}

/**
 * 空间命令，类似文件系统 + 收藏夹
 */
export default [
  listCommand,
  removeCommand,
  addCommand,
  mkdirCommand,
  pwdCommand,
  cdCommand,
  moveCommand,
  copyCommand,
];
