import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import MotoForm from "./pages/MotoForm";


function App() {
  return (
   <BrowserRouter>
      <Navbar />
      <main className="max-w-6x1 mx-auto px-4 py-6">
        <Routes>
         <Route path="/" element={<Homepage />} />
         <Route path="/motos/nueva" element={<MotoForm />} />
         <Route path="/motos/:id/editar" element={<MotoForm />} />
        </Routes>
     </main>
   </BrowserRouter>
  )
}

export default App;