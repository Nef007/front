import { makeAutoObservable } from "mobx";
import { contactAPI } from "../api";
import download from "downloadjs";
import { notification } from "./notificationStore";

export const contactsStore = makeAutoObservable({
  contacts: [],
  loading: false,
  idLoadingSelect: "",
  filtered: [],
  form: {
    firstname: "",
    email: "",
    phone: "",
    tags: [],
  },

  setForm(obj) {
    this.form = obj;
  },

  async get(form) {
    try {
      this.setLoading();
      const data = await contactAPI.get(form);
      this.contacts = data.data.data;
      this.filtered = this.contacts;
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },
  async delete(id) {
    try {
      this.setLoading();
      await contactAPI.delete(id);
      this.contacts = this.contacts.filter((item) => item.id !== id);
      this.filtered = this.contacts;
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
        await contactAPI.delete(id);
      }

      this.contacts = this.contacts.filter(
        (item) => !arrayId.includes(item.id)
      );
      this.filtered = this.contacts;
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },

  async onUpdateTags(form) {
    try {
      this.setLoading();
      await contactAPI.updateTags(form);
      this.contacts = this.contacts.map((item) => {
        if (item.id === form.contactId) {
          item.tags = form.tags;
        }
        return item;
      });
      this.filtered = this.contacts;
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
        delete form.lastname;
        delete form.patrony;
        await contactAPI.update(form);
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
      this.filtered = this.contacts;
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
      // this.filtered = this.contacts;
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },
  // async downloadFile() {
  //   try {
  //     const data = await contactAPI.download();
  //     download(data.data, "output.xlsx", "text/plain");
  //     // this.contacts = data.data;
  //     // this.filtered = this.contacts;
  //   } catch (e) {
  //     notification.setInfo("error", e.message);
  //   }
  // },

  async addManyTags(data) {
    try {
      for (let item of this.contacts) {
        if (data.contacts.includes(item.id)) {
          await this.saveContact({
            ...item,
            tags: [...item.tags, ...data.tags],
          });
        }
      }
    } catch (e) {
      this.setLoadingSelect("");
      notification.setInfo("error", e.message);
    }
  },

  async addTags(form) {
    try {
      this.setLoadingSelect(form.contactId);
      const data = await contactAPI.addTags(form);
      this.contacts = this.contacts.map((item) => {
        if (item.id === form.contactId) {
          item.tags = [...item.tags, data.data.data];
        }
        return item;
      });
      this.filtered = this.contacts;
      this.setLoadingSelect("");
    } catch (e) {
      this.setLoadingSelect("");
      notification.setInfo("error", e.message);
    }
  },

  async removeTags(form) {
    try {
      this.setLoadingSelect(form.contactId);

      const getData = () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ data: 177 }), 2000);
        });

      await getData();
      // await contactAPI.removeTags(form);
      this.contacts = this.contacts.map((item) => {
        if (item.id === form.contactId) {
          item.tags = item.tags.filter((item) => item.id !== form.id);
        }
        return item;
      });
      this.filtered = this.contacts;
      this.setLoadingSelect("");
    } catch (e) {
      this.setLoadingSelect("");
      notification.setInfo("error", e.message);
    }
  },

  onSearch(value) {
    this.filtered = this.contacts.filter((item) => {
      let bool = false;
      if (!value) bool = true;

      for (let i in item) {
        if (
          value &&
          String(item[i]).toLowerCase().includes(value.toLowerCase())
        ) {
          bool = true;
        }

        for (let text in item.tags) {
          if (value && text.toLowerCase().includes(value.toLowerCase())) {
            bool = true;
          }
        }
      }

      return bool;
    });
  },

  setLoading() {
    this.loading = !this.loading;
  },
  setLoadingSelect(value) {
    this.idLoadingSelect = value;
  },
});
