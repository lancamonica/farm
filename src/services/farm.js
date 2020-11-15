// internal
import api from "./api";

export const createFarm = async(data) => (await api.post("/farms", data));

export const listFarms = async() => (await api.get("/farms"));

export const getByIdFarm = async(id) => (await api.get(`/farms/${id}`));

export const updateFarm = async(id, data) => (await api.put(`/farms/${id}`, data));

export const deleteFarm = async(id) => (await api.delete(`/farms/${id}`));