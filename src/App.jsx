import { useState, useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import { useAppContext } from "./context/AppContext";
import PreviousResult from "./component/PreviousResult";
import Leaderboard from "./component/Leaderboard";
import Footer from "./component/Footer";
import Header from "./component/Header";
import WalletError from "./component/WalletError";
import LivePoolCard from "./component/LivePoolCard";
import Modal from "./component/Modal";
import useTimer from "./hook/useTimer";
import { TICKET_PRICE, INITIAL_TIME, DUMMY_POOL_DATA } from "./config/constant";

function CoinFlipApp() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { walletError } = useAppContext();
  const timeRemaining = useTimer(INITIAL_TIME);
  const [previousPools] = useState([
    {
      id: 1,
      result: "head",
      totalStaked: "120.5 ETH",
      userStake: { amount: 2.5, side: "tail" },
    },
    {
      id: 2,
      result: "tail",
      totalStaked: "98.2 ETH",
      userStake: { amount: 1.8, side: "tail" },
    },
  ]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {walletError && <WalletError walletError={walletError} />}
      <Header />
      <MainContent
        timeRemaining={timeRemaining}
        formatTime={formatTime}
        previousPools={previousPools}
      />
      <Footer />
      <Modal />
    </div>
  );
}

function MainContent({ timeRemaining, formatTime, previousPools }) {
  const { user } = useAppContext();
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <LivePoolCard
        poolData={DUMMY_POOL_DATA}
        timeRemaining={timeRemaining}
        formatTime={formatTime}
      />

      <PreviousResult previousPools={previousPools} />

      <Leaderboard userAddr={user.address} />
    </main>
  );
}

export default CoinFlipApp;
