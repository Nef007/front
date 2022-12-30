import axios from "axios";
axios.defaults.headers.common["X-CSRF-TOKEN"] = window.csrf_token;

export const contactAPI = {
  async create(form) {
    return await axios.post("/api/contacts", form);
  },

  async upload(form) {
    return await axios.post(
      "http://2a5d-188-162-195-211.ngrok.io/contacts/import",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  async download() {
    return await axios.get(
      "http://2a5d-188-162-195-211.ngrok.io/contacts/export"
    );
  },

  async getAll() {
    return await axios.get("http://2a5d-188-162-195-211.ngrok.io/api/contacts");
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
    return await axios.post(
      "http://2a5d-188-162-195-211.ngrok.io/api/tags",
      form
    );
  },
  async getAll() {
    return await axios.get("http://2a5d-188-162-195-211.ngrok.io/api/tags");
  },
  async get() {
    return await axios.get("/api/tags");
  },
  async update(form) {
    return await axios.put("/api/tags", form);
  },

  async delete(id) {
    return await axios.delete(
      `http://2a5d-188-162-195-211.ngrok.io/api/tags/${id}`
    );
  },
};
