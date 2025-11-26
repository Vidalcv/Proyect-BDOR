import { useEffect, useState } from "react";
import { createAsesoria } from "../api/asesoria.api";
import { getMaterias } from "../api/materias.api";
import Button from "../components/Button";
import { useAuth } from "../context/AuthProvider";

export default function CrearAsesoria() {
  const { user } = useAuth();

  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({
    idProfesor: user?.idUsuario || "",
    idAlumno: null,
    idMateria: "",
    datos_cita: {
      fecha: "",
      hora: "",
      estado: "pending",
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMaterias();
  }, []);

  const loadMaterias = async () => {
    try {
      const res = await getMaterias();
      setMaterias(res.data);
    } catch (err) {
      console.error("Error cargando materias:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Materia
    if (name === "idMateria") {
      return setForm((prev) => ({ ...prev, idMateria: Number(value) }));
    }

    // Datos de la cita
    if (["fecha", "hora", "estado"].includes(name)) {
      return setForm((prev) => ({
        ...prev,
        datos_cita: { ...prev.datos_cita, [name]: value }
      }));
    }

    // Resto de campos
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createAsesoria(form);
      alert("Asesoría creada correctamente");
      // Aquí puedes redirigir o limpiar el formulario
    } catch (err) {
      console.error("Error al crear asesoría:", err);
      alert("Error al crear asesoría");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold text-white">Crear Asesoría</h1>

      <form
        onSubmit={submit}
        className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 space-y-4"
      >
        {/* Materia */}
        <div>
          <label className="text-sm text-white/70">Materia</label>
          <select
            name="idMateria"
            value={form.idMateria}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          >
            <option value="">Selecciona</option>
            {materias.map((m) => (
              <option key={m.idMateria} value={m.idMateria}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className="text-sm text-white/70">Fecha</label>
          <input
            name="fecha"
            type="date"
            value={form.datos_cita.fecha}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />
        </div>

        {/* Hora */}
        <div>
          <label className="text-sm text-white/70">Hora</label>
          <input
            name="hora"
            type="time"
            value={form.datos_cita.hora}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />
        </div>

        {/* Estado */}
        <div>
          <label className="text-sm text-white/70">Estado</label>
          <select
            name="estado"
            value={form.datos_cita.estado}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          >
            <option value="pending">Pending</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <Button type="submit">{loading ? "Creando..." : "Crear Asesoría"}</Button>
      </form>
    </div>
  );
}
