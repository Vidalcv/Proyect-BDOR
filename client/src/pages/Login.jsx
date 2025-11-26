import { useState } from "react";
import Input from "../components/Input";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../api/usuarios.api";
import { useAuth } from "../context/AuthProvider";
import Button from "../components/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ correo: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handle = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ▶ LOGIN REAL API
      const res = await apiLogin({
        correo: form.correo,
        password: form.password,
      });

      const u = res.data.user;

      // Normalizar roles
      let role = u.departamento?.toLowerCase();
      if (role === "profesor") role = "maestro"; // 🔄 equivalencia interna

      // Guardar sesión global
      login({ ...res.data, user: { ...u, role } });

      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>

        <form onSubmit={submit} className="space-y-4">
          <Input
            label="Correo"
            name="correo"
            value={form.correo}
            onChange={handle}
            icon={Mail}
            placeholder="correo@ejemplo.com"
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handle}
            icon={Lock}
            placeholder="••••••••"
          />

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <Button type="submit">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
