import { defineStore } from "pinia";

/**
 * 终端配置状态存储
 *
 * @author yupi
 */
export const useTerminalConfigStore = defineStore("terminalConfig", {
  state: () => ({
    background: "black",
  }),
  getters: {},
  // 持久化
  persist: {
    key: "terminal-config-store",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load terminalConfigStore data start");
    },
    afterRestore: (context) => {
      console.log("load terminalConfigStore data end");
    },
  },
  actions: {
    setBackground(url: string) {
      if (!url) {
        return;
      }
      this.background = url;
    },
    reset() {
      this.$reset();
    },
  },
});
