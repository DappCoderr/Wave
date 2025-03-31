import { useAppContext } from "../context/AppContext";

const LivePoolCard = ({ poolData, timeRemaining, formatTime }) => {
  const { user, setModal, setWalletError } = useAppContext();

  const handleBuyClick = () => {
    if (!user.isConnected) {
      setWalletError("Please connect your wallet to buy tickets");
      return;
    }
    setModal({ show: true, type: "purchase" });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
      {/* Pool Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Live Pool #{poolData.id}
        </h2>
        <div className="flex items-center gap-3">
          <span>
            {timeRemaining > 0 ? (
              <p className="bg-gray-100 text-gray-900 px-3 py-1 rounded-md text-sm font-mono">
                {formatTime(timeRemaining)}
              </p>
            ) : (
              <p className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm">
                Timeup
              </p>
            )}
          </span>
          <span>
            {timeRemaining > 0 ? (
              <p className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm">
                Active
              </p>
            ) : (
              <p className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm">
                Closed
              </p>
            )}
          </span>
        </div>
      </div>

      {/* User Tickets Summary */}
      {user.tickets.length > 0 && (
        <div className="mb-4 bg-gray-100 p-3 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 font-medium">Your tickets:</span>
            <div className="flex gap-4">
              <span className="text-gray-900">
                Heads: {user.tickets.filter((t) => t.side === "Head").length}
              </span>
              <span className="text-gray-900">
                Tails: {user.tickets.filter((t) => t.side === "Tail").length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Heads/Tails Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {["heads", "tails"].map((side) => (
          <div
            key={side}
            className="border border-gray-200 rounded-lg p-4 relative"
          >
            {user.tickets.some((t) => t.side === "Head") && (
              <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-full">
                {user.tickets.filter((t) => t.side === "Head").length}
              </div>
            )}
            <h3 className="text-lg font-medium text-gray-900 mb-2 uppercase">
              {side} Vault
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between text-gray-600">
                <span>Share</span>
                <span className="font-medium">{poolData[side].share}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Flow Stake</span>
                <span className="font-medium">{poolData[side].bets}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Staked</span>
                <span className="font-medium">{poolData[side].staked}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pool Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 rounded-lg p-4 mb-6">
        {[
          { label: "Pool ID", value: `#${poolData.id}` },
          { label: "Players", value: poolData.totalPlayers },
          {
            label: "Total Bets",
            value: Number(poolData.heads.bets) + Number(poolData.tails.bets),
          },
          {
            label: "Your Bets",
            value: user.tickets.length,
            highlight: true,
          },
        ].map((item, idx) => (
          <div key={idx} className="text-center">
            <div className="text-sm text-gray-600">{item.label}</div>
            <div
              className={`font-medium ${
                item.highlight ? "text-gray-900" : "text-gray-900"
              }`}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Buy Button */}
      {timeRemaining > 0 && (
        <button
          onClick={handleBuyClick}
          className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Make a Bet
        </button>
      )}

      {/* Total Tickets Footer */}
      {user.tickets.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-600">
          You own {user.tickets.length} ticket
          {user.tickets.length !== 1 ? "s" : ""} in this pool
        </div>
      )}
    </div>
  );
};

export default LivePoolCard;
