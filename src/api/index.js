import axios from "axios";
axios.defaults.headers.common["X-CSRF-TOKEN"] = window.csrf_token;

export let BASE_URL_API = window.env.BASE_URL_API;

function getToken() {
  return localStorage.getItem("userData");
}

export const contactAPI = {
  async create(form) {
    return await axios.post(`${BASE_URL_API}/contacts`, form, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },

  async upload(form) {
    return await axios.post(`${BASE_URL_API}/contacts/import`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getToken(),
      },
    });
  },
  async download(search) {
     return await axios({
      url: `${BASE_URL_API}/contacts/export?limit=999999999&search=${search}`,
      method: "GET",
      headers: { Authorization: "Bearer " + getToken() },
      responseType: "blob", // Important
    })
  },

  async get(offset, limit, search = "") {
    return await axios.get(
      `${BASE_URL_API}/contacts?offset=${offset}&limit=${limit}&search=${search}`,
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    );
  },

  async update(form) {
    return await axios.put(`${BASE_URL_API}/contacts/${form.id}`, form, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },

  async delete(id) {
    return await axios.delete(`${BASE_URL_API}/contacts/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },
  async deleteArray(arrayId) {
    return await axios.delete(
      `${BASE_URL_API}/contacts`,
      { data: arrayId },
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
    return await axios.post(`${BASE_URL_API}/tags`, form, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },
  async get() {
    return await axios.get(`${BASE_URL_API}/tags?offset=0&limit=9999999999`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },

  async update(form) {
    return await axios.put(`${BASE_URL_API}/tags/${form.id}`, form, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },

  async delete(id) {
    return await axios.delete(`${BASE_URL_API}/tags/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
  },
  async deleteArray(arrayId) {
    return await axios.delete(
      `${BASE_URL_API}/tags/`,
      { data: arrayId },
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    );
  },
};
