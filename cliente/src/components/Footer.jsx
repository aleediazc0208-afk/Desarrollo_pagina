// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-zinc-950 border-t-4 border-orange-500 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-10">
        {/* Columna 1: marca */}
        <div>
          <h3 className="text-xl font-extrabold mb-2">
            🏍️ Moto<span className="text-orange-500">Park</span>
          </h3>
          <p className="text-zinc-400 text-sm">
            Control de motos y cascos del parqueadero: registro, tarifa por hora y liquidación.
          </p>
        </div>

        {/* Columna 2: horario (datos de ejemplo, puedes cambiarlos) */}
        <div>
          <h4 className="font-bold text-orange-500 mb-2">Horario</h4>
          <ul className="text-zinc-400 text-sm space-y-1">
            <li>Lunes a sábado: 6:00 a. m. – 10:00 p. m.</li>
            <li>Domingos y festivos: 8:00 a. m. – 6:00 p. m.</li>
          </ul>
        </div>

        {/* Columna 3: servicios */}
        <div>
          <h4 className="font-bold text-orange-500 mb-2">Servicios</h4>
          <ul className="text-zinc-400 text-sm space-y-1">
            <li>✔ Parqueo por horas</li>
            <li>✔ Guarda cascos</li>
            <li>✔ Vigilancia permanente</li>
          </ul>
        </div>
      </div>

      {/* Línea final con créditos */}
      <div className="border-t border-zinc-800 text-center text-zinc-500 text-xs py-4 px-6">
        © 2026 MotoPark · Desarrollado por Michell Diaz · SENA CBA Mosquera · ADSO
      </div>
    </footer>
  );
}

// Exportación por defecto: es la que usa "import Footer from ..." en App.jsx
export default Footer;