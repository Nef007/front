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
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },

  search: "",

  setForm(obj) {
    this.form = obj;
  },

  async downloadExport() {
    try {
      await contactAPI.download(this.search);
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },

  async get(pagination = this.pagination, search = this.search) {
    try {
      this.setLoading();
      const response = await contactAPI.get(pagination, search);
      this.pagination = { ...pagination, total: response.data.total };
      this.contacts = response.data.data;
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
      await this.get();
      // this.contacts = this.contacts.filter((item) => item.id !== id);
      // this.filtered = this.contacts;
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

      await this.get();

      // this.contacts = this.contacts.filter(
      //   (item) => !arrayId.includes(item.id)
      // );
      // this.filtered = this.contacts;
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
        if (!form.firstname) delete form.firstname;
        if (!form.patrony) delete form.patrony;
        if (!form.lastname) delete form.lastname;
        if (!form.phone) delete form.phone;
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
      let pagination = {
        current: 1,
        pageSize: 10,
        total: 0,
      };
      this.setLoading();
      const formData = new FormData();
      formData.append("contacts", file);
      const data = await contactAPI.upload(formData);
      // this.contacts = data.data;
      // this.filtered = this.contacts;
      await this.get(pagination, "");
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

  async onSearch(value) {
    let pagination = {
      current: 1,
      pageSize: 10,
      total: 0,
    };
    this.search = value;
    await this.get(pagination, value);
    // this.filtered = this.contacts.filter((item) => {
    //   let bool = false;
    //   if (!value) bool = true;
    //
    //   for (let i in item) {
    //     if (
    //       value &&
    //       String(item[i]).toLowerCase().includes(value.toLowerCase())
    //     ) {
    //       bool = true;
    //     }
    //
    //     for (let tag of item.tags) {
    //       console.log(tag);
    //       if (
    //         value &&
    //         tag.text &&
    //         tag.text.toLowerCase().includes(value.toLowerCase())
    //       ) {
    //         bool = true;
    //       }
    //     }
    //   }
    //
    //   return bool;
    // });
  },

  setLoading() {
    this.loading = !this.loading;
  },
  setLoadingSelect(value) {
    this.idLoadingSelect = value;
  },
});
