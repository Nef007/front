import { makeAutoObservable } from "mobx";
import { tagAPI } from "../api";
import { notification } from "./notificationStore";
import { useToggle } from "react-use";

export const tagsStore = makeAutoObservable({
  tags: [
    { id: 1, text: "dev", color: "#436543" },
    { id: 2, text: "fd", color: "#433243" },
    { id: 3, text: "soft", color: "#434343" },
  ],

  tag: {},

  loading: false,
  activeCreate: false,

  async getAll() {
    try {
      this.setLoading();
      const data = await tagAPI.getAll();
      this.tags = data.data;
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },
  async get(id) {
    try {
      const data = await tagAPI.get(id);
      this.tag = data.tag;
    } catch (e) {
      notification.setInfo("error", e.message);
    }
  },

  async create(form) {
    try {
      this.setLoading();
      const data = await tagAPI.create(form);
      this.tags = [...this.tags, data.data];

      this.setLoading();
    } catch (e) {
      notification.setInfo("error", e.message);
    }
  },
  async delete(id) {
    try {
      this.setLoading();
      const data = await tagAPI.delete(id);
      this.tags = this.tags.filter((item) => item.id !== id);
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },

  setLoading() {
    this.loading = !this.loading;
  },
  setActiveCreate(on, bool) {
    if (on) {
      this.activeCreate = bool;
    } else {
      this.activeCreate = !this.activeCreate;
    }
  },
});
