import React from "react";

const Leaderboard = ({ userAddr }) => {
  return (
    <section className="bg-gray-100 rounded-xl p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Leaderboard</h3>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((rank) => (
          <div
            key={rank}
            className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200"
          >
            <div className="text-gray-900">
              <span className="font-medium">#{rank}</span>{" "}
              {userAddr.slice(0, 6)}...{userAddr.slice(-4)}
            </div>
            <span className="text-gray-900 font-medium">{15 - rank} wins</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leaderboard;
