import axios from "./client";

// Obtiene todas las asesorías del profesor
export const getAsesoriasProfesor = (idProfesor) =>
  axios.get(`/asesorias/profesor/${idProfesor}`);

// Obtiene notificaciones del profesor
export const getNotificacionesProfesor = (idProfesor) =>
  axios.get(`/notificaciones/profesor/${idProfesor}`);
