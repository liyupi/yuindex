import { defineStore } from "pinia";

type CommandsAliasType = {
  [k: string]: string[],
};
/**
 * 别名状态(保存命令的别名)
 */
export const useAliasStore = defineStore("alias", {
  state: () => ({
    // 例如：{"mkdir": ["mk"]}
    commandsAlias: {} as CommandsAliasType,
    aliasNames: [] as string[]
  }),
  getters: {},
  // 持久化
  persist: {
    key: "alias-store",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load aliasStore data start");
    },
    afterRestore: (context) => {
      console.log("load aliasStore data end");
    },
  },
  actions: {
    getAllCommandsAlias(): CommandsAliasType {
      return this.commandsAlias;
    },
    getAllAliasName(): string[] {
      return this.aliasNames;
    },
    saveAliasName(commandName: string, aliasName: string) {
      const before = this.commandsAlias[commandName] || []
      this.commandsAlias[commandName] = [aliasName, ...before]
      this.aliasNames.push(aliasName)
    },
    removeAliasName(aliasName: string) {
      console.log(this.commandsAlias)
      console.log(this.aliasNames)
      for(let k in this.commandsAlias) {
        const index = this.commandsAlias[k].indexOf(aliasName);
        if (index > -1) {
          this.commandsAlias[k].splice(index, 1);
          this.aliasNames.splice(this.aliasNames.indexOf(aliasName), 1)
          return true;
        }
      }
      return false;
    },
    updateAliasName(sourceName:string, beforeAliasName: string, newAliasName: string) {
      this.commandsAlias[sourceName].splice(this.commandsAlias[sourceName].indexOf(beforeAliasName), 1, newAliasName)
      this.aliasNames.splice(this.aliasNames.indexOf(beforeAliasName), 1, newAliasName)
    },
    listAliasName(commandName: string) {
      return this.commandsAlias[commandName]
    },
    containsAliasName(aliasName: string) {
      return this.aliasNames.includes(aliasName);
    }
  },
});
