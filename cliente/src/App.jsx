// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import MotoForm from "./pages/MotoForm";

function App() {
  return (
    <BrowserRouter>
      {/* flex-col + min-h-screen: el footer queda siempre abajo */}
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* flex-1: el contenido ocupa el espacio libre entre navbar y footer */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
          <Routes>
            {/* Lista principal */}
            <Route path="/" element={<Homepage />} />
            {/* Crear moto */}
            <Route path="/motos/registrarMoto" element={<MotoForm />} />
            {/* Editar moto: el :id llega por useParams */}
            <Route path="/motos/:id/editar" element={<MotoForm />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;