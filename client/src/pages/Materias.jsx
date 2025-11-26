import { useEffect, useState } from "react";
import { getMaterias } from "../api/materias.api";
import ListadoMaterias from "../components/ListadoMaterias";
import Loading from "../components/Loading";

export default function Materias() {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMaterias();
  }, []);

  const loadMaterias = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getMaterias();
      setMaterias(res.data || []); // evita errores si viene undefined
    } catch (err) {
      console.error("Error cargando materias:", err);
      setError("No se pudieron cargar las materias.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="text-white space-y-4">
      <h1 className="text-3xl font-bold">Materias</h1>

      {error && (
        <div className="p-3 bg-red-600/20 border border-red-500/40 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {!materias.length ? (
        <p className="text-gray-400">No hay materias registradas.</p>
      ) : (
        <ListadoMaterias materias={materias} />
      )}
    </div>
  );
}
