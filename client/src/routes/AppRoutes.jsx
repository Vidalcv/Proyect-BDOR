// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

// Importar todas tus páginas
import Login from '../pages/Login.jsx';
import DashboardProfesor from '../pages/DashboardProfesor.jsx';
import DashboardAlumno from '../pages/DashboardAlumno.jsx';
import CrearAsesoria from '../pages/CrearAsesoria.jsx';
import Perfil from '../pages/Perfil.jsx';
import NotFound from '../pages/NotFound.jsx';
import MainLayout from '../layout/MainLayout.jsx';
import MisAsesorias from '../pages/MisAsesorias.jsx';
import AsesoriasP from '../pages/AsesoriaProfesor.jsx';

// Componente de protección de rutas
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />; 
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  // Dashboard según rol
  const DashboardComponent =
    user?.role === "maestro" ? DashboardProfesor : DashboardAlumno;

  return (
    <BrowserRouter>
      <Routes>

        {/* RUTAS PÚBLICAS */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/404" element={<NotFound />} />

        {/* DASHBOARD COMÚN */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['maestro', 'alumno']}>
              <DashboardComponent />
            </ProtectedRoute>
          }
        />

        {/* RUTAS ALUMNO */}
        <Route
          path="/crear-asesoria"
          element={
            <ProtectedRoute allowedRoles={['alumno']}>
              <CrearAsesoria />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-asesorias"
          element={
            <ProtectedRoute allowedRoles={['alumno']}>
              <MisAsesorias /> {/* Cambiado de Asesorias */}
            </ProtectedRoute>
          }
        />

        {/* RUTAS MAESTRO */}
        <Route
          path="/asesoriasP"
          element={
            <ProtectedRoute allowedRoles={['maestro']}>
              <AsesoriasP /> {/* Corregido */}
            </ProtectedRoute>
          }
        />

        {/* RUTA COMÚN */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute allowedRoles={['maestro', 'alumno']}>
              <Perfil />
            </ProtectedRoute>
          }
        />

        {/* REDIRECCIONES */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/404" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
