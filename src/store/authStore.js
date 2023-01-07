import { makeAutoObservable } from "mobx";
import { notification } from "antd";

export const authStore = makeAutoObservable({
  isAuth: false,
  loading: false,
  initialized: false,

  async auth(password) {
    try {
      localStorage.setItem("userData", password);
      this.isAuth = true;
    } catch (e) {
      notification.setInfo("error", e.message);
    }
  },

  async me() {
    try {
      let password = localStorage.getItem("userData");

      if (password) {
        this.isAuth = true;
      }
    } catch (e) {
      //notification.setInfo("error", e.message);
      this.logout();
    }
  },

  async initializedApp() {
    await this.me();
    this.initialized = true;
  },

  logout() {
    this.isAuth = false;
    localStorage.removeItem("userData");
  },

  setLoading() {
    this.loading = !this.loading;
  },
});
