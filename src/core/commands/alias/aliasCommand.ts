import { CommandType } from "../../command";
import { commandMap } from "../../commandRegister";
import addAliasCommand from './subCommand/addAliasCommand'
import lsAliasCommand from "./subCommand/lsAliasCommand";
import removeAliasCommand from "./subCommand/removeAliasCommand";
import updateAliasCommand from "./subCommand/updateAliasCommand";
import { useAliasStore } from "./aliasStore";

export const registerAlias = function () {
  const { getAllCommandsAlias } = useAliasStore();
  const allCommandsAlias = getAllCommandsAlias()
  for (let command in allCommandsAlias) {
    allCommandsAlias[command].forEach((aliasName) => {
      commandMap[aliasName] = commandMap[command]
    })
  }
}

/**
 * 别名命令
 * @author Hamusuta0320
 */
const aliasCommand: CommandType = {
  func: "alias",
  name: "别名",
  alias: [],
  params: [
    {
      key: "subCommand",
      desc: "add|rm|mv|ls",
      required: true,
    },
  ],
  desc: "别名操作",
  subCommands: {
    add: addAliasCommand,
    rm: removeAliasCommand,
    mv: updateAliasCommand,
    ls: lsAliasCommand
  },
  options: [],
  async action(options, terminal) {

  },
};
/**
* 是否存在命令
* @author Hamusuta0320
*/
export const existInCommandMap = (commandName: string) => {
  console.log(commandMap[commandName])
  return commandMap[commandName] !== undefined;
}
export default [aliasCommand];
