import { makeAutoObservable } from "mobx";
import { contactAPI, tagAPI } from "../api";
import { notification } from "./notificationStore";

export const tagsStore = makeAutoObservable({
  tags: [],
  tag: {},
  loading: false,
  filtered: [],

  async get() {
    try {
      this.setLoading();
      const data = await tagAPI.get();
      this.tags = data.data.data;
      console.log(this.tags);
      this.filtered = this.tags;
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },
  // async get(id) {
  //   try {
  //     const data = await tagAPI.get(id);
  //     this.tag = data.tag;
  //   } catch (e) {
  //     notification.setInfo("error", e.message);
  //   }
  // },

  async save(form) {
    try {
      this.setLoading();
      if (form.id) {
        await tagAPI.update(form);
        this.tags = this.tags.map((item) => {
          if (item.id === form.id) {
            item = form;
          }
          return item;
        });
      } else {
        const data = await tagAPI.create(form);
        this.tags = [...this.tags, data.data];
      }
      this.filtered = this.tags;
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
      this.filtered = this.tags;
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },
  async deleteArray(arrayId) {
    try {
      this.setLoading();
      for (let id of arrayId) {
        await tagAPI.delete(id);
      }
      // const data = await tagAPI.deleteArray(arrayId);
      this.tags = this.tags.filter((item) => !arrayId.includes(item.id));
      this.filtered = this.tags;
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },

  onSearch(value) {
    this.filtered = this.tags.filter((item) => {
      let bool = false;
      if (!value) bool = true;

      for (let i in item) {
        if (
          value &&
          String(item[i]).toLowerCase().includes(value.toLowerCase())
        ) {
          bool = true;
        }
      }

      return bool;
    });
  },

  setLoading() {
    this.loading = !this.loading;
  },
});
