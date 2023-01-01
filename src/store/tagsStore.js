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
  activeEdit: false,
  tagActive: {
    text: "",
    color: "",
  },

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
  async delete(arrayId) {
    try {
      this.setLoading();
      // const data = await tagAPI.delete(id);
      this.tags = this.tags.filter((item) => !arrayId.includes(item.id));
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },

  resetTagActive() {
    this.tagActive = {
      text: "",
      color: "#FF6900",
    };
  },

  setLoading() {
    this.loading = !this.loading;
  },
  setActiveCreate() {
    this.activeCreate = !this.activeCreate;
    if (this.activeCreate) {
      this.resetTagActive();
    }
  },
  setActiveEdit() {
    this.activeEdit = !this.activeEdit;
    if (this.activeCreate) {
      this.resetTagActive();
    }
  },
});
