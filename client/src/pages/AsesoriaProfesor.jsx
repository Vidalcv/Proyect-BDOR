export default function AsesoriasProfesor() {
  const asesorias = [
    { alumno: "Juan Pérez", tema: "BD", fecha: "12/11/2025", estado: "pendiente" },
    { alumno: "Ana López", tema: "Redes", fecha: "11/11/2025", estado: "aceptada" },
  ];

  return (
    <div className="text-white space-y-6">
      <h2 className="text-2xl font-bold">Mis Asesorías</h2>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">Alumno</th>
              <th className="p-3 text-left">Tema</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>

          <tbody>
            {asesorias.map((a, i) => (
              <tr key={i} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-3">{a.alumno}</td>
                <td className="p-3">{a.tema}</td>
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
