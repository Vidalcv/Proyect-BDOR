import client from "./client";


export const login = (credentials) => client.post("/auth/login", credentials);
export const getUsuario = (id) => client.get(`/usuarios/${id}`);
export const getUsuarios = () => client.get("/usuarios");
export const createUsuario = (payload) => client.post("/usuarios", payload);
export const updateUsuario = (id, payload) => client.put(`/usuarios/${id}`, payload);
