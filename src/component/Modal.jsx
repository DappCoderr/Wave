import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Modal = () => {
  const { modal, setModal, addTickets } = useAppContext();
  const [inputValue, setInputValue] = useState("20");
  const [selectedTickets, setSelectedTickets] = useState(20);
  const [selectedSide, setSelectedSide] = useState(null);
  const [validationError, setValidationError] = useState("");

  const handleTicketChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setInputValue("");
      return;
    }

    if (!/^\d*$/.test(value)) return;

    setInputValue(value);

    if (value !== "") {
      const numValue = parseInt(value);
      if (numValue < 20) {
        setValidationError("Minimum amount to bet is 20 Flow");
        setSelectedTickets(numValue);
      } else {
        setSelectedTickets(numValue);
        setValidationError("");
      }
    }
  };

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
  };

  if (!modal.show || modal.type !== "purchase") return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Make a Bet</h3>
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
              Number of Flow you want to stake
            </label>
            <input
              type="number"
              //   min="20"
              value={inputValue}
              placeholder="Minimum 20 Flow"
              onChange={handleTicketChange}
              //   onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
            {validationError && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">
                {validationError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Side
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Head", "Tail"].map((side) => (
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
            disabled={!selectedSide || selectedTickets < 20}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              !selectedSide || selectedTickets < 20
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Bet {selectedTickets} Flow on {selectedSide}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
