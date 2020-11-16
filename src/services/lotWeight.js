// internal
import api from "./api";

export const createLotWeight = async(data) => (await api.post("/lotweights", data));

export const listLotsWeight = async() => (await api.get("/lotweights"));

export const getByIdLotWeight = async(id) => (await api.get(`/lotweights/${id}`));

export const updateLotWeight = async(id, data) => (await api.put(`/lotweights/${id}`, data));

export const deleteLotWeight = async(id) => (await api.delete(`/lotweights/${id}`));

