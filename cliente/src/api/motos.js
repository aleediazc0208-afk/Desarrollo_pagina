
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


const api = axios.create({
  baseURL: `${API_URL}/api/motos`,
});

export const fetchMotos = async () => {
  const res = await api.get("");
  return res.data;
};


export const fetchMoto = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data;
};


export const createMoto = async (moto) => {
  const res = await api.post("", moto);
  return res.data;
};

export const updateMoto = async (id, moto) => {
  const res = await api.put(`/${id}`, moto);
  return res.data;
};


export const deleteMoto = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};