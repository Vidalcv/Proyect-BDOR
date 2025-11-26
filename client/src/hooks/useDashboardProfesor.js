import { useEffect, useState } from "react";
import {
  getAsesoriasProfesor,
  getNotificacionesProfesor,
} from "../api/dashboard.api";

import {
  getAsesoriasHoy,
  getTotalAsesorias,
  getAlumnosAtendidos,
  getNotificacionesNoLeidas,
  getProximaAsesoria,
} from "../utils/dashboardProfesor.utils";

export function useDashboardProfesor(idProfesor) {
  const [asesorias, setAsesorias] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [aRes, nRes] = await Promise.all([
        getAsesoriasProfesor(idProfesor),
        getNotificacionesProfesor(idProfesor),
      ]);

      setAsesorias(aRes.data);
      setNotificaciones(nRes.data);
    } catch (err) {
      console.error("Error cargando dashboard profesor", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    asesorias,
    notificaciones,

    // valores calculados
    asesoriasHoy: getAsesoriasHoy(asesorias).length,
    totalAsesorias: getTotalAsesorias(asesorias),
    alumnosAtendidos: getAlumnosAtendidos(asesorias),
    proximaAsesoria: getProximaAsesoria(asesorias),
    notificacionesNoLeidas: getNotificacionesNoLeidas(notificaciones),
  };
}
