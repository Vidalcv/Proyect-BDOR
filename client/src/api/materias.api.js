import client from "./client";

export const getMaterias = () => client.get("/materias");
export const getMateria = (id) => client.get(`/materias/${id}`);
export const createMateria = (payload) => client.post("/materias", payload);
export const updateMateria = (id, payload) => client.put(`/materias/${id}`, payload);
export const deleteMateria = (id) => client.delete(`/materias/${id}`);
