import axios from "axios";
axios.defaults.headers.common["X-CSRF-TOKEN"] = window.csrf_token;

export let BASE_URL = "http://ruzalgc8.beget.tech/laravel/public/index.php";

export const contactAPI = {
  async create(form) {
    return await axios.post(`${BASE_URL}/api/contacts`, form);
  },

  async upload(form) {
    return await axios.post(`${BASE_URL}/contacts/import`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async download() {
    return await axios.get(`${BASE_URL}/contacts/export`);
  },

  async get() {
    return await axios.get(`${BASE_URL}/api/contacts`);
  },

  async update(form) {
    return await axios.put(`${BASE_URL}/api/contacts`, form);
  },

  async delete(id) {
    return await axios.delete(`${BASE_URL}/api/contacts/${id}`);
  },
  async deleteArray(arrayId) {
    return await axios.delete(`${BASE_URL}/api/contacts`, { data: arrayId });
  },
  async addTags(form) {
    return await axios.post(`${BASE_URL}/contacts/export`, form);
  },
  async removeTags(form) {
    return await axios.delete(`${BASE_URL}/contacts/export`, { data: form });
  },
};

export const tagAPI = {
  async create(form) {
    return await axios.post(`${BASE_URL}/api/tags`, form);
  },
  async get() {
    return await axios.get(`${BASE_URL}/api/tags`);
  },
  // async get() {
  //   return await axios.get("/api/tags");
  // },
  async update(form) {
    return await axios.put(`${BASE_URL}/api/tags/${form.id}`, form);
  },

  async delete(id) {
    return await axios.delete(`${BASE_URL}/api/tags/${id}`);
  },
  async deleteArray(arrayId) {
    return await axios.delete(`${BASE_URL}/api/tags/`, { data: arrayId });
  },
};
