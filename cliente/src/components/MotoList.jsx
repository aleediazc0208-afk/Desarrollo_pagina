import MotoCard from "./MotoCard";

function MotoList({ motos, onToggle }) {
    if (motos.length === 0) {
        return (
            <p className="text-center text-gray-500 mt-10">
                No hay motos regsitradas todavia
            </p>

        );
    }


return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {motos.map((moto) => (
            <MotoCard key={moto._id} moto={moto} onToggle={onToggle} />
        ))}
    </div>
);

}

export default MotoList;



