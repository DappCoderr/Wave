import React from "react";
import { useState } from "react";
import PoolCard from "./PoolCard";

const PreviousResult = ({ previousPools }) => {
  const [visiblePools, setVisiblePools] = useState(4);

  const handleLoadMore = () => {
    setVisiblePools((prev) => prev + 4);
  };

  return (
    <div>
      <section className="mb-8 bg-gray-100 rounded-xl p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Previous Results
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {previousPools.slice(0, visiblePools).map((pool) => (
            <PoolCard key={pool.id} pool={pool} userStake={pool.userStake} />
          ))}
        </div>
        {visiblePools < previousPools.length && (
          <button
            onClick={handleLoadMore}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors"
          >
            Load More
          </button>
        )}
      </section>
    </div>
  );
};

export default PreviousResult;
