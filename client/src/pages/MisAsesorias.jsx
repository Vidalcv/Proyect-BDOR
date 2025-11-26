import { useEffect, useState } from "react";
import { getAsesorias } from "../api/asesoria.api";

export default function MisAsesoriasAlumno() {
  const [asesorias, setAsesorias] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAsesorias();
        setAsesorias(res.data);
      } catch (err) {
        console.error("Error cargando asesorías:", err);
      }
    };

    load();
  }, []);

  return (
    <div className="text-white space-y-6">
      <h2 className="text-2xl font-bold">Mis Asesorías</h2>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">Profesor</th>
              <th className="p-3 text-left">Materia</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>

          <tbody>
            {asesorias.map((a) => (
              <tr
                key={a.idAsesoria}
                className="border-t border-white/10 hover:bg-white/5"
              >
                <td className="p-3">{a.profesor}</td>
                <td className="p-3">{a.materia}</td>
                <td className="p-3">{a.fecha}</td>
                <td className="p-3 capitalize">{a.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
