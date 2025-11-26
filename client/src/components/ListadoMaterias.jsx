export default function ListadoMaterias({ materias = [] }) {
  return (
    <div className="grid gap-3">
      {materias.map((m) => (
        <div key={m.idMateria} className="p-3 bg-white/5 border border-white/6 rounded-xl">
          {m.nombre}
        </div>
      ))}
    </div>
  );
}
