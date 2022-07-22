import { defineStore } from "pinia";
import { getLoginUser } from "./userApi";
import { LOCAL_USER } from "./userConstant";
import UserType = User.UserType;

/**
 * 用户系统
 */
export const useUserStore = defineStore("user", {
  state: () => ({
    loginUser: {
      ...LOCAL_USER,
    },
  }),
  getters: {},
  // 持久化
  persist: {
    key: "user-store",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load userStore data start");
    },
    afterRestore: (context) => {
      console.log("load userStore data end");
    },
  },
  actions: {
    async getAndSetLoginUser() {
      const res: any = await getLoginUser();
      if (res?.code === 0 && res.data) {
        this.loginUser = res.data;
      } else {
        console.error("登录失败");
        this.$reset();
      }
    },
    setLoginUser(user: UserType) {
      this.loginUser = user;
    },
  },
});
