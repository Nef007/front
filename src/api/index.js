import axios from "axios";
axios.defaults.headers.common["X-CSRF-TOKEN"] = window.csrf_token;

export let BASE_URL = "http://xeonnull.com:444";

function getToken() {
  return localStorage.getItem("userData");
}

export const contactAPI = {
  async create(form) {
    return await axios.post(`${BASE_URL}/api/contacts`, form, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },

  async upload(form) {
    return await axios.post(`${BASE_URL}/contacts/import`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getToken(),
      },
    });
  },
  async download() {
    return await axios.get(`${BASE_URL}/contacts/export`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },

  async get() {
    return await axios.get(`${BASE_URL}/api/contacts`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },

  async update(form) {
    return await axios.put(`${BASE_URL}/api/contacts`, form, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },

  async delete(id) {
    return await axios.delete(`${BASE_URL}/api/contacts/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },
  async deleteArray(arrayId) {
    return await axios.delete(
      `${BASE_URL}/api/contacts`,
      { data: arrayId },
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    );
  },
  async addTags(form) {
    return await axios.post(`${BASE_URL}/contacts/export`, form, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },
  async removeTags(form) {
    return await axios.delete(
      `${BASE_URL}/contacts/export`,
      { data: form },
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    );
  },
};

export const tagAPI = {
  async create(form) {
    return await axios.post(`${BASE_URL}/api/tags`, form, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },
  async get() {
    return await axios.get(`${BASE_URL}/api/tags`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },
  // async get() {
  //   return await axios.get("/api/tags");
  // },
  async update(form) {
    return await axios.put(`${BASE_URL}/api/tags/${form.id}`, form, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },

  async delete(id) {
    return await axios.delete(`${BASE_URL}/api/tags/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },
  async deleteArray(arrayId) {
    return await axios.delete(
      `${BASE_URL}/api/tags/`,
      { data: arrayId },
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    );
  },
};
