import { useEffect, useState } from "react";
import { fetchMotos, updateMoto } from "../api/motos";
import MotoList from "../components/MotoList";

function Homepage() {
    const [motos, setMotos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const cargarMotos = async () => {
        try {
            const data = await fetchMotos();
            setMotos(data);
        }   catch (err) {
            setError("No se pudo conectar con el servidor.");
        }   finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarMotos();
    }, []);


    const cambiarEstado = async (moto) => {
        try {
            await updateMoto(moto._id, {liquidado: !moto.liquidado });
            cargarMotos();
        }   catch (err) {
            setError("No se pudo cambiar el estado");
        }
    };

    if (cargando) return <p className="text-center mt-10"> Cargando...</p>;

    return (
        <div>
            <h1 className="text-3x1 font-bold text-orange-800 mb-6">
                Motos en el Parqueadero
            </h1>
            {error&& (
                <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</p>
            )}
            <MotoList motos={motos} onToggle={cambiarEstado} />
        </div>
    );
}


export default Homepage;