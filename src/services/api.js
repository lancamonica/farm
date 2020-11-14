import axios from "axios";

const api = axios.create({
  baseURL: "https://mixchallenge-back.premix.app.br"
});

api.interceptors.request.use(async config => {
  const owner = "lancamonica6@gmail.com"
  config.headers.owner = owner;
  return config;
});

export default api;