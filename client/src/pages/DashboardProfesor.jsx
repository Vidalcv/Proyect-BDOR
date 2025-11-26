import { motion } from "framer-motion";
import { CalendarCheck, BookOpen, Users2, Bell } from "lucide-react";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthProvider";
import { useDashboardProfesor } from "../hooks/useDashboardProfesor";

export default function DashboardProfesor() {
  const { user } = useAuth();
  const {
    loading,
    asesoriasHoy,
    totalAsesorias,
    alumnosAtendidos,
    proximaAsesoria,
  } = useDashboardProfesor(user.idUsuario);

  if (loading) return <Loading />;

  const resumen = [
    { title: "Asesorías Hoy", value: asesoriasHoy, icon: CalendarCheck },
    { title: "Total Asesorías", value: totalAsesorias, icon: BookOpen },
    { title: "Alumnos Atendidos", value: alumnosAtendidos, icon: Users2 },
  ];

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-white"
      >
        Dashboard del Profesor
      </motion.h1>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {resumen.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-gray-900/80 border border-gray-700 flex items-center gap-4 shadow-lg"
          >
            <div className="p-3 bg-indigo-500/20 rounded-xl">
              <r.icon className="w-7 h-7 text-indigo-300" />
            </div>
            <div>
              <p className="text-sm text-white/70">{r.title}</p>
              <p className="text-2xl font-bold text-white">{r.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Próxima asesoría */}
      {proximaAsesoria && (
        <div className="bg-gray-800 p-4 rounded-xl text-white">
          Próxima asesoría:  
          <span className="font-bold ml-2">
            {proximaAsesoria.datos_cita.fecha} —
            {proximaAsesoria.datos_cita.hora}
          </span>
        </div>
      )}
    </div>
  );
}
