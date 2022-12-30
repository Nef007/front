import { makeAutoObservable } from "mobx";
import { contactAPI } from "../api";
import download from "downloadjs";
import { notification } from "./notificationStore";

export const contactsStore = makeAutoObservable({
  contacts: [],
  loading: false,

  async getAll(form) {
    try {
      this.setLoading();
      const data = await contactAPI.getAll(form);
      this.contacts = data.data;
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },

  async uploadFile(file) {
    try {
      this.setLoading();
      const formData = new FormData();
      formData.append("files", file);
      const data = await contactAPI.upload(formData);
      // this.contacts = data.data;
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },
  async downloadFile() {
    try {
      const data = await contactAPI.download();
      download(data.data, "output.xlsx", "text/plain");
      // this.contacts = data.data;
    } catch (e) {
      notification.setInfo("error", e.message);
    }
  },

  setLoading() {
    this.loading = !this.loading;
  },
});
