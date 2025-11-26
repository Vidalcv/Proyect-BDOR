export default function TablaAsesorias({ data }) {
  return (
    <div className="bg-gray-900/80 border border-gray-700 rounded-2xl overflow-hidden">
      <table className="w-full text-white text-sm">
        <thead className="bg-gray-800/50">
          <tr>
            <th className="p-3 text-left">Alumno</th>
            <th className="p-3 text-left">Materia</th>
            <th className="p-3 text-left">Fecha</th>
            <th className="p-3 text-left">Estado</th>
          </tr>
        </thead>

        <tbody>
          {data?.length ? (
            data.map((a, i) => (
              <tr key={i} className="border-t border-gray-700 hover:bg-gray-800/30">
                <td className="p-3">{a.nombre_alumno}</td>
                <td className="p-3">{a.materia_nombre}</td>
                <td className="p-3">{a.fechaAsesoria}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs ${
                      a.estado === "pendiente"
                        ? "bg-yellow-500/30 text-yellow-200"
                        : a.estado === "aceptada"
                        ? "bg-green-500/30 text-green-200"
                        : "bg-red-500/30 text-red-200"
                    }`}
                  >
                    {a.estado}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 text-center text-gray-400" colSpan="4">
                No hay asesorías registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
