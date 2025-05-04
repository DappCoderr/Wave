import * as fcl from "@onflow/fcl";

export const GET_POOL_TOTAL_BALANCE = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

access(all) fun main(id:UInt64): UFix64{
  pre {
      CoinFlip.totalPools >= id && id != 0: "Pool Does not exist"
  }
  let poolRef = CoinFlip.borrowPool(id:id)
  return poolRef.getPoolTotalBalance()
}`;

export const getPoolTotalBalance = async (id) => {
  try {
    const response = await fcl.query({
      cadence: GET_POOL_TOTAL_BALANCE,
      args: (arg, t) => [arg(id, t.UInt64)],
    });
    console.log("pool total balance", response);
    return response;
  } catch (error) {
    console.error("Error in total pool balance:", error);
    throw error;
  }
};
