import client from "./client";


export const getAsesorias = () => client.get("/asesorias");
export const getAsesoria = (id) => client.get(`/asesorias/${id}`);
export const createAsesoria = (payload) => client.post("/asesorias", payload);
export const updateAsesoria = (id, payload) => client.put(`/asesorias/${id}`, payload);
export const deleteAsesoria = (id) => client.delete(`/asesorias/${id}`);
export const getAsesoriasByProfesor = (idProfesor) =>
  client.get(`/asesorias/profesor/${idProfesor}`);
export const getAsesoriasByAlumno = (idAlumno) =>
  client.get(`/asesorias/alumno/${idAlumno}`);
