import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { user, connectWallet, disconnectWallet, setWalletError } =
    useAppContext();
  const [showDisconnectMenu, setShowDisconnectMenu] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(user.address);
    const copyBtn = document.getElementById("copy-btn");
    copyBtn.classList.add("animate-ping-once");
    setTimeout(() => {
      copyBtn.classList.remove("animate-ping-once");
    }, 500);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900">
      <h1 className="text-2xl font-bold text-white">FlipFortunes</h1>

      <div className="relative">
        <button
          onClick={() =>
            user.isConnected
              ? setShowDisconnectMenu(!showDisconnectMenu)
              : connectWallet()
          }
          className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          {user.isConnected ? (
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
                {`${user.address.slice(0, 6)}...${user.address.slice(-4)}`}
              </span>
            </>
          ) : (
            "Connect Wallet"
          )}
        </button>

        {user.isConnected && showDisconnectMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 animate-fade-in">
            <div className="p-3">
              <div className="flex items-center justify-between group">
                <div className="text-xs text-gray-600 truncate max-w-[120px] font-mono">
                  {user.address}
                </div>
                <button
                  onClick={handleCopyAddress}
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
                onClick={disconnectWallet}
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
  );
};

export default Header;
