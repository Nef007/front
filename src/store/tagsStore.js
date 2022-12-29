import { makeAutoObservable } from "mobx";
import { tagAPI } from "../api";
import { notification } from "./notificationStore";

export const tagsStore = makeAutoObservable({
  tags: [],

  tag: {},

  loading: false,

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
      const data = await tagAPI.get(form);
      this.tags.push(form);
    } catch (e) {
      notification.setInfo("error", e.message);
    }
  },

  setLoading() {
    this.loading = !this.loading;
  },
});
