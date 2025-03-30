import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Modal = () => {
  const { modal, setModal, user, addTickets } = useAppContext();
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [selectedSide, setSelectedSide] = useState(null);

  const handlePurchase = () => {
    if (!selectedSide) return;

    const newTickets = Array.from({ length: selectedTickets }, (_, i) => ({
      id: Date.now() + i,
      side: selectedSide,
      amount: 0.1,
      timestamp: new Date().toISOString(),
    }));

    addTickets(newTickets);
    setModal({ show: false, type: "", data: null });
    setSelectedTickets(1);
    setSelectedSide(null);
  };

  if (!modal.show || modal.type !== "purchase") return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Buy Tickets</h3>
          <button
            onClick={() => setModal({ show: false, type: "", data: null })}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Tickets
            </label>
            <input
              type="number"
              min="1"
              value={selectedTickets}
              onChange={(e) =>
                setSelectedTickets(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Side
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["heads", "tails"].map((side) => (
                <button
                  key={side}
                  onClick={() => setSelectedSide(side)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedSide === side
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {side.charAt(0).toUpperCase() + side.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePurchase}
            disabled={!selectedSide}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              selectedSide
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Purchase {selectedTickets} Ticket{selectedTickets > 1 ? "s" : ""} (
            {selectedTickets * 0.1} ETH)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
