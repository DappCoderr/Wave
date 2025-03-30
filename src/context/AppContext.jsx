// contexts/AppContext.jsx
import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    isConnected: false,
    address: "",
    tickets: [],
  });
  const [walletError, setWalletError] = useState("");
  const [modal, setModal] = useState({
    show: false,
    type: "",
  });

  const connectWallet = () => {
    const dummyAddress = `0x${Array(20)
      .fill()
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("")}`;
    setUser({
      isConnected: true,
      address: dummyAddress,
      tickets: [],
    });
    setWalletError("");
  };

  const disconnectWallet = () => {
    setUser({
      isConnected: false,
      address: "",
      tickets: [],
    });
    setModal({ show: false, type: "" });
  };

  const addTickets = (tickets) => {
    setUser((prev) => ({
      ...prev,
      tickets: [...prev.tickets, ...tickets],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        walletError,
        modal,
        addTickets,
        setModal,
        connectWallet,
        disconnectWallet,
        setWalletError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
