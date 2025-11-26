import { useEffect, useState } from "react";
import { User, Mail, Phone } from "lucide-react";
import Button from "../components/Button";
import { getUsuario, updateUsuario } from "../api/usuarios.api";

export default function Perfil() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  // Cargar perfil real
  useEffect(() => {
    loadPerfil();
  }, []);

  const loadPerfil = async () => {
    try {
      const res = await getUsuario();
      setForm(res.data);
    } catch (err) {
      console.error("Error cargando perfil:", err);
    }
  };

  if (!form)
    return <div className="text-white text-center mt-20">Cargando...</div>;

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleContacto = (e) =>
    setForm({
      ...form,
      contacto: { ...form.contacto, [e.target.name]: e.target.value }
    });

  const save = async () => {
    setSaving(true);
    try {
      await updateUsuario(form);
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al guardar perfil");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-white">Perfil</h1>

      <div className="bg-gray-800 p-6 rounded-2xl space-y-4 shadow-md">

        {/* Nombre */}
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-white/70" />
          <input
            name="nombre"
            value={form.nombre}
            onChange={handle}
            className="bg-gray-700 text-white p-2 rounded-lg flex-1"
            placeholder="Nombre"
          />
        </div>

        {/* Correo */}
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-white/70" />
          <input
            name="correo"
            value={form.contacto?.correo || ""}
            onChange={handleContacto}
            className="bg-gray-700 text-white p-2 rounded-lg flex-1"
            placeholder="Correo"
          />
        </div>

        {/* Teléfono */}
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-white/70" />
          <input
            name="telefono"
            value={form.contacto?.telefono || ""}
            onChange={handleContacto}
            className="bg-gray-700 text-white p-2 rounded-lg flex-1"
            placeholder="Teléfono"
          />
        </div>

        <Button onClick={save}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
}
