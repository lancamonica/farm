// internal
import api from "./api";

export const createLot = async(data) => (await api.post("/farmLots", data));

export const listLots = async() => (await api.get("/farmLots"));

export const getByIdLot = async(id) => (await api.get(`/farmLots/${id}`));

export const updateLot = async(id, data) => (await api.put(`/farmLots/${id}`, data));

export const deleteLot = async(id) => (await api.delete(`/farmLots/${id}`));

