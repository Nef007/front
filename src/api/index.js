import axios from "axios";
axios.defaults.headers.common["X-CSRF-TOKEN"] = window.csrf_token;

let BASE_URL = "https://4cf8-178-176-166-190.ngrok.io";

export const contactAPI = {
  async create(form) {
    return await axios.post("/api/contacts", form);
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

  async getAll() {
    return await axios.get(`${BASE_URL}/api/contacts`);
  },
  async get() {
    return await axios.get("/api/contacts");
  },

  async update(form) {
    return await axios.put("/api/contacts", form);
  },

  async delete(id) {
    return await axios.delete("/api/contacts");
  },
};

export const tagAPI = {
  async create(form) {
    return await axios.post(`${BASE_URL}/api/tags`, form);
  },
  async getAll() {
    return await axios.get(`${BASE_URL}/api/tags`);
  },
  async get() {
    return await axios.get("/api/tags");
  },
  async update(form) {
    return await axios.put("/api/tags", form);
  },

  async delete(id) {
    return await axios.delete(`${BASE_URL}/api/tags/${id}`);
  },
};
