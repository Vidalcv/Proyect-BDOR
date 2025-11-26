import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Bell, BookOpen } from "lucide-react";
import { getDashboardAlumno } from "../api/alumno.api";

export default function DashboardAlumno() {
  const [resumen, setResumen] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardAlumno(); // 📌 API real
      setResumen(res.data); // Debe devolver los 4 datos del dashboard
    } catch (err) {
      console.error("Error cargando dashboard:", err);
    }
  };

  const iconMap = {
    asesorias: Calendar,
    proxima: Clock,
    notificaciones: Bell,
    materias: BookOpen,
  };

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-white"
      >
        Dashboard del Alumno
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {resumen.map((item, i) => {
          const Icon = iconMap[item.icon]; // asignar icono dinámico
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-gray-900/80 border border-gray-700 flex gap-4 shadow-lg"
            >
              <div className="p-3 bg-indigo-500/20 rounded-xl">
                <Icon className="w-7 h-7 text-indigo-300" />
              </div>
              <div>
                <p className="text-sm text-white/70">{item.title}</p>
                <p className="text-xl font-bold text-white">{item.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 text-white">
        Panel general del alumno…
      </div>
    </div>
  );
}
