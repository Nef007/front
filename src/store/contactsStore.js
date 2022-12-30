import { makeAutoObservable } from "mobx";
import { contactAPI } from "../api";
import download from "downloadjs";
import { notification } from "./notificationStore";

export const contactsStore = makeAutoObservable({
  contacts: [
    {
      id: 1,
      name: "Влад",
      email: "kaidalon@yandex.ru",
      phone: "8 950 713 27 69",
      tags: [
        { text: "soft", color: "#ff4545" },
        { text: "point", color: "#ff4545" },
      ],
    },
    {
      id: 2,
      name: "Артем",
      email: "kaalov@yandex.ru",
      phone: "8 950 713 27 48",
      tags: [
        { text: "soft", color: "#ff4545" },
        { text: "point", color: "#ff4545" },
      ],
    },
    {
      id: 3,
      name: "Александр",
      email: "kaidal@yandex.ru",
      phone: "8 950 713 27 69",
      tags: [
        { text: "soft", color: "#ff4545" },
        { text: "point", color: "#ff4545" },
      ],
    },
  ],
  loading: false,

  async getAll(form) {
    try {
      const data = await contactAPI.getAll(form);
      this.contacts = data.data;
    } catch (e) {
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
