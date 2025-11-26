import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

// Definición de enlaces por rol
const navItems = {
  maestro: [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Asesorías', path: '/asesoriasP' },
    { name: 'Perfil', path: '/perfil' },
  ],
  alumno: [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Crear Asesoría', path: '/crear-asesoria' },
    { name: 'Perfil', path: '/perfil' },
  ],
};

export default function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const userRole = user?.role;
  const links = navItems[userRole] || [];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900/80 text-white p-4 flex flex-col border-r border-gray-700 shadow-lg">
        <div className="flex items-center mb-10">
          <span className="text-2xl font-bold ml-2">PROYECTO</span>
        </div>
        
        {/* Navegación */}
        <nav className="flex-1">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition duration-150 mb-2
                ${location.pathname === item.path 
                  ? 'bg-gray-800 font-bold'
                  : 'hover:bg-gray-800/50'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Logout */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <button 
            onClick={logout}
            className="w-full p-2 text-center rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-end items-center p-4 bg-gray-900/80 shadow-sm h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                U
            </div> 
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto bg-gray-900/90 text-white">
          {children}
        </div>
      </main>
    </div>
  );
}
