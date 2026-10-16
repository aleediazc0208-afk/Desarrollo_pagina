import { Link } from "react-router-dom";

function MotoCard({ moto, onToggle }) {
  return (
    <div
      className={`rounded-xl shadow-md p-5 border-l-8 transition ${
        moto.liquidado
          ? "bg-green-50 border-green-500"
          : "bg-white border-gray-400"
      }`}
    >
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          {moto.placa_moto}
        </h2>

        <button
          onClick={() => onToggle(moto)}
          title={moto.liquidado ? "Marcar como pendiente" : "Marcar como liquidado"}
          className={`p-2 rounded-full transition ${
            moto.liquidado
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>

      <div className="mt-3 space-y-1 text-gray-700">
        <p>Cascos guardados: <span className="font-semibold">{moto.cascos_guardados}</span></p>
        <p>Tarifa por hora: <span className="font-semibold">${moto.tarifa_hora}</span></p>
        <p>
          Estado:{" "}
          <span
            className={`font-semibold ${
              moto.liquidado ? "text-green-600" : "text-red-500"
            }`}
          >
            {moto.liquidado ? "Liquidado" : "Pendiente"}
          </span>
        </p>
      </div>

      <div className="mt-4">
        <Link
          to={`/motos/${moto._id}/editar`}
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Editar
        </Link>
      </div>
    </div>
  );
}

export default MotoCard;