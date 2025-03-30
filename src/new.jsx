import { useState, useEffect } from "react";

const PoolCard = ({ pool, userStake }) => {
  const [claimed, setClaimed] = useState(false);
  const hasWon = userStake && pool.result === userStake.side;
  const resultColor =
    pool.result === "heads"
      ? "bg-blue-100 text-blue-600"
      : "bg-purple-100 text-purple-600";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Top Section */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">Pool ID</p>
          <p className="text-sm font-medium text-gray-900">#{pool.id}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Result</p>
          <span className={`text-xs px-2 py-1 rounded-full ${resultColor}`}>
            {pool.result || "Pending"}
          </span>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">Total Stake</p>
          <p className="text-sm font-medium text-gray-900">
            {pool.totalStaked}
          </p>
        </div>
        {userStake && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Your Stake</p>
            <p className="text-sm font-medium text-gray-900">
              {userStake.amount} ETH
            </p>
          </div>
        )}
      </div>

      {/* User Bet Details */}
      {userStake && (
        <div className="mb-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">You Bet On</p>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {userStake.side}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p
                className={`text-sm font-medium ${
                  hasWon ? "text-green-600" : "text-red-600"
                }`}
              >
                {hasWon ? "Won" : "Lost"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Claim Section */}
      {hasWon && !claimed && (
        <button
          onClick={() => setClaimed(true)}
          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors"
        >
          Claim {(parseFloat(pool.totalStaked) * 0.5).toFixed(2)} ETH
        </button>
      )}
      {claimed && (
        <div className="text-center text-green-600 text-xs py-2">
          Reward Claimed
        </div>
      )}
    </div>
  );
};

export default function CoinFlipInterface() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [selectedSide, setSelectedSide] = useState("heads");
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60);
  const [showDisconnectMenu, setShowDisconnectMenu] = useState(false);
  const [walletError, setWalletError] = useState("");

  const poolData = {
    id: "1",
    heads: { share: "45%", bets: "234", staked: "45.2 ETH" },
    tails: { share: "55%", bets: "287", staked: "58.7 ETH" },
    totalPlayers: "521",
    totalStaked: "103.9 ETH",
  };

  const [previousPools] = useState([
    {
      id: 1,
      result: "heads",
      totalStaked: "120.5 ETH",
      userStake: { amount: 2.5, side: "tails" },
    },
    {
      id: 2,
      result: "tails",
      totalStaked: "98.2 ETH",
      userStake: { amount: 1.8, side: "tails" },
    },
  ]);

  const handleDisconnect = () => {
    setIsConnected(false);
    setUserAddress("");
    setShowDisconnectMenu(false);
  };

  const handleConnectWallet = () => {
    if (!isConnected) {
      const dummyAddress = `0x${Array(20)
        .fill()
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")}`;
      setUserAddress(dummyAddress);
      setIsConnected(true);
      setWalletError("");
    }
  };

  const handleBuyTicket = () => {
    if (!isConnected) {
      setWalletError("Please connect your wallet to buy tickets");
      return;
    }
    setShowModal(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.documentElement.classList.add("overflow-y-hidden");
    } else {
      document.documentElement.classList.remove("overflow-y-hidden");
    }
    return () => {
      document.documentElement.classList.remove("overflow-y-hidden");
    };
  }, [showModal]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePurchase = () => {
    console.log(`Purchased ${selectedTickets} tickets for ${selectedSide}`);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Wallet Error Message */}
      {walletError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <div className="flex justify-between items-center">
            <p>{walletError}</p>
            <button
              onClick={handleConnectWallet}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900">
        <h1 className="text-2xl font-bold text-white">FlipFortunes</h1>
        <div className="relative">
          <button
            onClick={() =>
              isConnected
                ? setShowDisconnectMenu(!showDisconnectMenu)
                : handleConnectWallet()
            }
            className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            {isConnected ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-mono">
                  {`${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`}
                </span>
              </>
            ) : (
              "Connect Wallet"
            )}
          </button>

          {isConnected && showDisconnectMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 animate-fade-in">
              <div className="p-3">
                <div className="flex items-center justify-between group">
                  <div className="text-xs text-gray-600 truncate max-w-[120px] font-mono">
                    {userAddress}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(userAddress);
                      const copyBtn = document.getElementById("copy-btn");
                      copyBtn.classList.add("animate-ping-once");
                      setTimeout(() => {
                        copyBtn.classList.remove("animate-ping-once");
                      }, 500);
                    }}
                    id="copy-btn"
                    className="ml-2 p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                    aria-label="Copy address"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md mt-2 transition-colors duration-200"
                >
                  Disconnect
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Live Pool Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Live Pool #{poolData.id}
            </h2>
            <div className="flex items-center gap-3">
              <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-md text-sm font-mono">
                {timeRemaining > 0 ? formatTime(timeRemaining) : "Expired"}
              </span>
              <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-md text-sm">
                {timeRemaining > 0 ? "Active" : "Closed"}
              </span>
            </div>
          </div>

          {/* Heads/Tails Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {["heads", "tails"].map((side) => (
              <div key={side} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2 uppercase">
                  {side}
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-gray-600">
                    <span>Share</span>
                    <span className="font-medium">{poolData[side].share}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Bets</span>
                    <span className="font-medium">{poolData[side].bets}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Staked</span>
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
                value:
                  Number(poolData.heads.bets) + Number(poolData.tails.bets),
              },
              { label: "Total Staked", value: poolData.totalStaked },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-sm text-gray-600">{item.label}</div>
                <div className="font-medium text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Buy Button */}
          <button
            onClick={handleBuyTicket}
            className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Buy Ticket (0.1 ETH)
          </button>
        </div>

        {/* Previous Results Section - Always visible when connected */}
        {isConnected && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Previous Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previousPools.map((pool) => (
                <PoolCard
                  key={pool.id}
                  pool={pool}
                  userStake={pool.userStake}
                />
              ))}
            </div>
          </section>
        )}

        {/* ... [keep leaderboard and footer sections] ... */}
        <section className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Leaderboard
          </h3>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((rank) => (
              <div
                key={rank}
                className="flex justify-between items-center bg-white p-2 rounded-lg"
              >
                <div className="text-gray-900">
                  <span className="font-medium">#{rank}</span> Player_{rank}
                </div>
                <span className="text-gray-900">{15 - rank} wins</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="mt-8 py-4 bg-gray-900">
        <div className="container mx-auto px-4 text-center text-white">
          <p>© 2023 FlipFortunes</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-gray-300">
              Terms
            </a>
            <a href="#" className="hover:text-gray-300">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-300">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
