import { makeAutoObservable } from "mobx";
import { contactAPI } from "../api";
import download from "downloadjs";
import { notification } from "./notificationStore";

export const contactsStore = makeAutoObservable({
  contacts: [],
  loading: false,
  activeModalCreate: false,
  activeModalEdit: false,
  formContact: {
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
  async create() {
    try {
      this.setLoading();
      const data = await contactAPI.create(this.formContact);
      this.contacts = [...this.contacts, data.data];
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },
  async setForm(e) {
    this.formContact = { ...this.formContact, [e.target.name]: e.target.value };
    console.log(this.formContact);
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

  onEditContact(id) {
    this.setActiveModalEdit();
  },

  setLoading() {
    this.loading = !this.loading;
  },
  setActiveModalCreate(on, bool) {
    if (on) {
      console.log(33333);
      this.activeModalCreate = bool;
    } else {
      this.activeModalCreate = !this.activeModalCreate;
    }
  },

  setActiveModalEdit(on, bool) {
    if (on) {
      this.activeModalEdit = bool;
    } else {
      this.activeModalEdit = !this.activeModalEdit;
    }
  },
});
