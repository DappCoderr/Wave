import React from "react";

const WalletError = ({ walletError }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <div className="flex justify-center items-center">
        <p>{walletError}</p>
      </div>
    </div>
  );
};

export default WalletError;
