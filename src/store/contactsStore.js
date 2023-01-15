import { makeAutoObservable } from "mobx";
import { contactAPI } from "../api";
import { notification } from "./notificationStore";
import download from "downloadjs";

export const contactsStore = makeAutoObservable({
  contacts: [],
  loading: false,
  idLoadingSelect: [],
  activeTogifi: '',
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  offset: 0,
  limit: 10,

  search: "",

setActiveTogifi(value){
    this.activeTogifi=value
},

  setPagination(pagination){
    this.pagination=pagination
    this.offset=this.pagination.pageSize * (this.pagination.current - 1)
    this.limit = this.pagination.pageSize
  },

  async downloadExport() {
    try {
     let response = await contactAPI.download(this.search);
      download(response.data, "contacts.xlsx");
    } catch (e) {
      notification.setInfo("error", "Слишком большая выборка, попробуйте изменить запрос");
    }
  },

  async get(offset = this.offset, limit = this.limit, search = this.search) {
    try {
      this.setLoading();
      const response = await contactAPI.get(offset, limit, search);
      this.setPagination({...this.pagination, total: response.data.total})
      this.contacts = response.data.data;
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
      this.setLoading();
      if(this.contacts.length-1===0 && this.pagination.current>1){
        this.setPagination({...this.pagination, current: this.pagination.current-1,  total: this.pagination.total-1 })
      }
      await this.get();
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
      this.setLoading();
      if(this.contacts.length-arrayId.length===0 && this.pagination.current>1){
        this.setPagination({...this.pagination, current: this.pagination.current-1 , total: this.pagination.total-arrayId.length })
      }
      await this.get();
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
        await this.get()
      }
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },

  async saveContactFormModal(form) {
    this.setLoadingSelect([...this.idLoadingSelect,form.id])
    try {
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

    } catch (e) {
      this.setLoadingSelect([])
      notification.setInfo("error", e.message);
    }
  },
  saveContactFormModalMass(form) {
    this.setLoadingSelect([...this.idLoadingSelect,form.id])
    try {
        if (!form.firstname) delete form.firstname;
        if (!form.patrony) delete form.patrony;
        if (!form.lastname) delete form.lastname;
        if (!form.phone) delete form.phone;
         contactAPI.update(form);
       this.contacts = this.contacts.map((item) => {
        if (item.id === form.id) {
          item = form;
        }
        return item;
      });
    } catch (e) {
      this.setLoadingSelect([])
      notification.setInfo("error", e.message);
    }
  },

  async saveContactForm(form) {
    try {
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
    } catch (e) {
      notification.setInfo("error", e.message);
    }
  },

  async uploadFile(file) {
    try {
      this.setLoading();
      const formData = new FormData();
      formData.append("contacts", file);
      await contactAPI.upload(formData);
      window.location.reload()
      this.setLoading();
    } catch (e) {
      this.setLoading();
      notification.setInfo("error", e.message);
    }
  },

  async addManyTags(data) {

      for (let item of this.contacts) {
        if (data.contacts.includes(item.id)) {
          await this.saveContact({
            ...item,
            tags: [...item.tags, ...data.tags],
          });
        }
      }

  },

  async onSearch(value) {
    this.search = value;
    this.setPagination({...this.pagination, current: 1 })
    await this.get(0);
  },

  setLoading() {
    this.loading = !this.loading;
  },
  setLoadingSelect(value) {
    this.idLoadingSelect = value;
  },
});
