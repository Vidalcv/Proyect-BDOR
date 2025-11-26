import axios from "./client";

// Asesorías del alumno
export const getAsesoriasAlumno = async (idAlumno) => {
  try {
    const res = await axios.get(`/alumnos/${idAlumno}/asesorias`);
    return res.data;
  } catch (error) {
    console.error("Error obteniendo asesorías del alumno:", error);
    throw error;
  }
};
export const getDashboardAlumno = async (idAlumno) => {
  try {
    const res = await axios.get(`/dashboard/alumno/${idAlumno}`);
    return res.data;
  } catch (error) {
    console.error("Error en getDashboardAlumno:", error);
    throw error;
  }
};
