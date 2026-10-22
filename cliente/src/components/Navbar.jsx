import { useState } from "react";
// NavLink resalta el enlace de la página activa
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  // Controla si el menú móvil está abierto o cerrado
  const [abierto, setAbierto] = useState(false);

  // Clases de cada enlace: naranja si es la página actual
  const estiloLink = ({ isActive }) =>
    `px-3 py-2 rounded-md font-medium transition ${
      isActive
        ? "bg-orange-500 text-black"
        : "text-zinc-300 hover:text-orange-400"
    }`;

  return (
    // sticky: la barra queda fija arriba al hacer scroll
    <header className="sticky top-0 z-50 bg-zinc-950 border-b-4 border-orange-500 shadow-lg">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo y nombre del parqueadero */}
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
          <span className="text-2xl">🏍️</span>
          <span>
            Moto<span className="text-orange-500">Park</span>
          </span>
        </Link>

        {/* Botón hamburguesa: solo visible en pantallas pequeñas */}
        <button
          className="md:hidden text-zinc-300"
          onClick={() => setAbierto(!abierto)}
          aria-label="Abrir menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Enlaces: en móvil se muestran solo si el menú está abierto; en md+ siempre */}
        <div className={`${abierto ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-zinc-950 md:bg-transparent px-6 md:px-0 pb-4 md:pb-0 gap-2 md:items-center`}>
          <NavLink to="/" end className={estiloLink} onClick={() => setAbierto(false)}>
            Inicio
          </NavLink>
          {/* Ajusta esta ruta a la de tu formulario de creación */}
          <NavLink to="/motos/registrarMoto" className={estiloLink} onClick={() => setAbierto(false)}>
            Registrar moto
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;