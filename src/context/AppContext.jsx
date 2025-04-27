import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useCurrentFlowUser } from "@onflow/kit";

const AppContext = createContext();

export function AppProvider({ children }) {
  const { user: flowUser, authenticate, unauthenticate } = useCurrentFlowUser();

  const [user, setUser] = useState({
    isConnected: false,
    address: "",
    tickets: [],
  });

  const [walletError, setWalletError] = useState("");
  const errorTimeout = useRef(null);

  const [modal, setModal] = useState({
    show: false,
    type: "",
  });

  const setTemporaryError = (message) => {
    if (errorTimeout.current) {
      clearTimeout(errorTimeout.current);
    }

    setWalletError(message);

    errorTimeout.current = setTimeout(() => {
      setWalletError("");
      errorTimeout.current = null;
    }, 2000);
  };

  const connectWallet = async () => {
    try {
      await authenticate();
      setWalletError("");
    } catch (error) {
      console.error(error);
      setTemporaryError("Failed to connect wallet.");
    }
  };

  const disconnectWallet = async () => {
    try {
      await unauthenticate();
      setUser({
        isConnected: false,
        address: "",
        tickets: [],
      });
      setModal({ show: false, type: "" });
    } catch (error) {
      console.error(error);
      setTemporaryError("Failed to disconnect wallet.");
    }
  };

  const addTickets = (tickets) => {
    setUser((prev) => ({
      ...prev,
      tickets: [...prev.tickets, ...tickets],
    }));
  };

  useEffect(() => {
    if (flowUser?.addr) {
      setUser((prev) => ({
        ...prev,
        isConnected: true,
        address: flowUser.addr,
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        isConnected: false,
        address: "",
      }));
    }
  }, [flowUser]);

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
        setWalletError: setTemporaryError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
