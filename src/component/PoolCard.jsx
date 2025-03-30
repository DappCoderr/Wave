import { useState } from "react";

const PoolCard = ({ pool, userStake }) => {
  const [claimed, setClaimed] = useState(false);
  const hasWon = userStake && pool.result === userStake.side;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
      {/* Card Header */}
      <div className="bg-gray-800 px-4 py-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-white tracking-wider uppercase">
            Pool
          </h3>
          <span className="text-xs font-bold text-white bg-gray-700 px-2 py-1 rounded">
            #{pool.id}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Result Status */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">
              Pool Result
            </p>
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                pool.result === "head"
                  ? "bg-gray-900 text-white"
                  : pool.result === "tail"
                  ? "bg-white text-gray-900 border-2 border-gray-900"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {pool.result
                ? pool.result.charAt(0).toUpperCase() + pool.result.slice(1)
                : "Pending"}
            </span>
          </div>

          {userStake && (
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Your Result
              </p>
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  hasWon
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {hasWon ? "Winner" : "Lost"}
              </span>
            </div>
          )}
        </div>

        {/* Stake Information */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                Total Stake
              </p>
              <p className="text-lg font-bold text-gray-900">
                {pool.totalStaked}
              </p>
            </div>

            {userStake && (
              <div className="text-right">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Your Stake
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {userStake.amount} ETH
                </p>
              </div>
            )}
          </div>

          {userStake && (
            <div className="bg-gray-200 p-3 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    You Bet On
                  </p>
                  <p className="text-sm font-bold text-gray-900 capitalize">
                    {userStake.side}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Potential Win
                  </p>
                  <p className="text-sm font-bold text-green-600">
                    {(parseFloat(pool.totalStaked) * 0.5).toFixed(2)} ETH
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Claim Button */}
        {hasWon && !claimed && (
          <button
            onClick={() => setClaimed(true)}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
          >
            Claim Reward
          </button>
        )}

        {claimed && (
          <div className="text-center bg-green-50 text-green-700 font-bold py-3 px-4 rounded-lg border border-green-100">
            Reward Claimed
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolCard;
