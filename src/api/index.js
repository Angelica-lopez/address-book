const axios = require("axios").default;

const baseUrl = "https://618aac0d34b4f400177c480e.mockapi.io/api";

export const getClients = () => {
  return axios.get(`${baseUrl}/v1/contactos`).then(({ data }) => data);
};