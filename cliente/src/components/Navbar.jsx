import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="max-w-6x1 mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link to="/" className="text-x1 font-bold flex items-center gap-2">
                Parqueadero de Motos Los Diaz 
                </Link>
                <Link 
                    to="/motos/nueva"
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition"
                    >
                        Registrar Moto
                    </Link>
            </div>
        </nav>
    );
}

export default Navbar;