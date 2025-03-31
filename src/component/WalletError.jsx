import { useAppContext } from "../context/AppContext";

const WalletError = () => {
  const { walletError } = useAppContext();

  if (!walletError) return null;

  return (
    <div className="animate-fade-in bg-red-100 border-l-4 border-red-500 text-red-700 p-4 animate-fade-in">
      <div className="flex justify-center items-center">
        <p>{walletError}</p>
      </div>
    </div>
  );
};

export default WalletError;
