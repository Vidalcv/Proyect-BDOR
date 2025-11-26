// Obtener asesorías del día (fecha actual)
export function getAsesoriasHoy(asesorias) {
  const hoy = new Date().toISOString().slice(0, 10);
  return asesorias.filter(a => a.datos_cita.fecha === hoy);
}

// Total de asesorías
export function getTotalAsesorias(asesorias) {
  return asesorias.length;
}

// Total alumnos únicos atendidos
export function getAlumnosAtendidos(asesorias) {
  const ids = asesorias.map(a => a.idAlumno);
  return new Set(ids).size;
}

// Próxima asesoría futura
export function getProximaAsesoria(asesorias) {
  const ahora = new Date();

  const futuras = asesorias
    .map(a => ({
      ...a,
      datetime: new Date(`${a.datos_cita.fecha}T${a.datos_cita.hora}`),
    }))
    .filter(a => a.datetime > ahora)
    .sort((a, b) => a.datetime - b.datetime);

  return futuras[0] || null;
}

// Contar notificaciones no leídas
export function getNotificacionesNoLeidas(notificaciones) {
  return notificaciones.filter(n => !n.leida).length;
}
