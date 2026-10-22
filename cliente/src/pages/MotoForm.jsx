import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchMoto, createMoto, updateMoto, deleteMoto } from "../api/motos";

function MotoForm() {
  // Un estado por cada campo del modelo Moto
  const [placa, setPlaca] = useState("");
  const [cascos, setCascos] = useState(0);
  const [tarifa, setTarifa] = useState(0);
  const [liquidado, setLiquidado] = useState(false);

  // Mensaje de error del backend (por ejemplo, placa duplicada)
  const [error, setError] = useState("");

  // params.id existe solo en modo edición
  const params = useParams();
  const navigate = useNavigate();

  // Si hay id, trae la moto y llena los campos
  useEffect(() => {
    async function cargarMoto() {
      try {
        // fetchMoto ya devuelve el objeto de la moto (sin ".data")
        const moto = await fetchMoto(params.id);
        setPlaca(moto.placa_moto);
        setCascos(moto.cascos_guardados);
        setTarifa(moto.tarifa_hora);
        setLiquidado(moto.liquidado);
      } catch (err) {
        console.error("Error al cargar la moto:", err);
        setError("No se pudo cargar la moto");
      }
    }
    if (params.id) {
      cargarMoto();
    }
  }, [params.id]);

  // Crea o actualiza según haya id en la URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const datos = {
      placa_moto: placa,
      cascos_guardados: Number(cascos),
      tarifa_hora: Number(tarifa),
      liquidado,
    };

    try {
      if (params.id) {
        await updateMoto(params.id, datos);
      } else {
        await createMoto(datos);
      }
      // Redirección automática al inicio
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Ocurrió un error al guardar");
    }
  };

  // Elimina la moto tras confirmar
  const handleDelete = async () => {
    if (window.confirm("¿Seguro que deseas eliminar esta moto?")) {
      try {
        await deleteMoto(params.id);
        navigate("/");
      } catch (err) {
        setError(err.response?.data?.detail || "No se pudo eliminar la moto");
      }
    }
  };

  // Clases compartidas por los campos de texto y número
  const estiloInput =
    "w-full rounded-lg bg-zinc-900 border border-zinc-600 px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40";

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-zinc-800 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Encabezado de la tarjeta: cambia según el modo */}
        <div className="bg-orange-500 text-black px-8 py-5">
          <h1 className="text-2xl font-extrabold">
            {params.id ? "✏️ Editar moto" : "🏍️ Registrar moto"}
          </h1>
          <p className="text-sm font-medium opacity-80">
            {params.id
              ? "Modifica los datos y guarda los cambios"
              : "Completa los datos de la moto que ingresa"}
          </p>
        </div>

        <div className="p-8 space-y-5">
          {/* Mensaje de error: solo aparece si existe */}
          {error && (
            <p className="bg-red-600/90 text-white px-4 py-3 rounded-lg text-sm font-medium">
              ⚠️ {error}
            </p>
          )}

          {/* Campo: placa */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-zinc-300">
              Placa de la moto
            </label>
            <input
              type="text"
              placeholder="Ej: ABC12D"
              maxLength={6}
              className={`${estiloInput} font-mono tracking-widest uppercase`}
              value={placa}
              // La placa siempre se guarda en mayúsculas
              onChange={(e) => setPlaca(e.target.value.toUpperCase())}
              autoFocus
              required
            />
          </div>

          {/* Campos numéricos en dos columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-zinc-300">
                Cascos guardados
              </label>
              <input
                type="number"
                min="0"
                className={estiloInput}
                value={cascos}
                onChange={(e) => setCascos(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-semibold text-zinc-300">
                Tarifa por hora ($)
              </label>
              <input
                type="number"
                min="0"
                step="100"
                className={estiloInput}
                value={tarifa}
                onChange={(e) => setTarifa(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Campo booleano: liquidado */}
          <label className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-5 w-5 accent-orange-500"
              checked={liquidado}
              onChange={(e) => setLiquidado(e.target.checked)}
            />
            <span className="text-zinc-200 font-medium">
              Liquidado (el cliente ya pagó)
            </span>
          </label>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-400 text-black font-bold px-5 py-2.5 rounded-lg transition"
            >
              {params.id ? "Actualizar moto" : "Guardar moto"}
            </button>

            {/* Botón cancelar: vuelve al inicio sin guardar */}
            <Link
              to="/"
              className="px-5 py-2.5 rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700 font-semibold transition"
            >
              Cancelar
            </Link>

            {/* Eliminación condicional: solo al editar */}
            {params.id && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default MotoForm;