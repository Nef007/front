import { makeAutoObservable } from "mobx";
import { contactAPI } from "../api";
import download from "downloadjs";
import { notification } from "./notificationStore";
import { useLogger } from "react-use";

export const contactsStore = makeAutoObservable({
  contacts: [
    {
      id: 1,
      firstname: "Влад",
      email: "kaydalov",
      phone: "895043545",
      tags: [{ id: 3, text: "soft", color: "#434343" }],
    },
    {
      id: 2,
      firstname: "Александр",
      email: "kaydalov",
      phone: "89507345",
      tags: [
        { id: 3, text: "dev", color: "#436543" },
        { id: 2, text: "fd", color: "#436543" },
      ],
    },
  ],
  loading: false,
  idLoadingSelect: "",
  activeModalCreate: false,
  activeModalEdit: false,
  contactActive: {
    firstname: "",
    email: "",
    phone: "",
    tags: [],
  },

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
  async saveContact(form) {
    try {
      this.setLoading();
      if (form.id) {
        const data = await contactAPI.update(form);
        this.contacts = this.contacts.map((item) => {
          if (item.id === form.id) {
            item = form;
          }
          return item;
        });
      } else {
        const data = await contactAPI.create(form);
        this.contacts = [...this.contacts, data.data];
      }
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

  async addTags(form) {
    try {
      this.setLoadingSelect(form.contactId);
      const data = await contactAPI.addTags(form);
      this.contacts = this.contacts.map((item) => {
        if (item.id === form.contactId) {
          item.tags = [...item.tags, data.data];
        }
        return item;
      });
      this.setLoadingSelect("");
    } catch (e) {
      this.setLoadingSelect("");
      notification.setInfo("error", e.message);
    }
  },

  async deleteTags(form) {
    try {
      this.setLoadingSelect(form.contactId);

      const getData = () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ data: 177 }), 2000);
        });

      await getData();
      // await contactAPI.deleteTags(form);
      this.contacts = this.contacts.map((item) => {
        if (item.id === form.contactId) {
          item.tags = item.tags.filter((item) => item.id !== form.id);
        }
        return item;
      });
      this.setLoadingSelect("");
    } catch (e) {
      this.setLoadingSelect("");
      notification.setInfo("error", e.message);
    }
  },

  onEditContact(id) {
    this.contactActive = this.contacts.filter((item) => item.id === id)[0];
    this.setActiveModalEdit();
  },

  setLoading() {
    this.loading = !this.loading;
  },
  setLoadingSelect(value) {
    this.idLoadingSelect = value;
  },

  resetcontactActive() {
    this.contactActive = {
      firstname: "",
      email: "",
      phone: "",
      tags: [],
    };
  },
  setActiveModalCreate() {
    this.activeModalCreate = !this.activeModalCreate;
    if (this.activeModalCreate) {
      this.resetcontactActive();
    }
  },
  setActiveModalEdit() {
    this.activeModalEdit = !this.activeModalEdit;
    if (this.activeModalCreate) {
      this.resetcontactActive();
    }
  },
});
