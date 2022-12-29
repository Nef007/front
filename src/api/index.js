import axios from "axios";

export const contactAPI = {
  async create(form) {
    return await axios.post("/api/contacts", form);
  },

  async getAll() {
    return await axios.get("/api/contacts");
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
    return await axios.post("/api/tags", form);
  },
  async getAll() {
    return await axios.get("https://41c1-188-162-195-211.ngrok.io/api/tags");
  },
  async get() {
    return await axios.get("/api/tags");
  },
  async update(form) {
    return await axios.put("/api/tags", form);
  },

  async delete() {
    return await axios.delete("/api/tags");
  },
};
