import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="ml-60 p-4 flex justify-between items-center border-b border-white/6">
      <div className="text-white/70">Bienvenido{user ? `, ${user.nombre}` : ""}</div>
      <div className="flex gap-4 items-center">
        {user ? (
          <button onClick={logout} className="px-3 py-1 rounded-md bg-white/5">Cerrar sesión</button>
        ) : (
          <span className="text-white/60">No autenticado</span>
        )}
      </div>
    </header>
  );
}
