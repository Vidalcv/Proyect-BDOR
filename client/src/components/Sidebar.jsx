import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 fixed left-0 top-0 h-full bg-gray-900/80 border-r border-gray-700 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Asesorías</h1>
        <p className="text-gray-400 text-sm">Panel</p>
      </div>

      <nav className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className="py-2 px-3 rounded-lg text-white hover:bg-gray-800/50"
        >
          Dashboard
        </Link>
        <Link
          to="/asesorias"
          className="py-2 px-3 rounded-lg text-white hover:bg-gray-800/50"
        >
          Asesorías
        </Link>
        <Link
          to="/crear-asesoria"
          className="py-2 px-3 rounded-lg text-white hover:bg-gray-800/50"
        >
          Crear Asesoría
        </Link>
        <Link
          to="/materias"
          className="py-2 px-3 rounded-lg text-white hover:bg-gray-800/50"
        >
          Materias
        </Link>
        <Link
          to="/perfil"
          className="py-2 px-3 rounded-lg text-white hover:bg-gray-800/50"
        >
          Perfil
        </Link>
      </nav>
    </aside>
  );
}
