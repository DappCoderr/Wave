import * as fcl from "@onflow/fcl";
import { getSingleUserInfo } from "../User/getSingleUserInfo_Head.script";
import { getPoolTotalBalance } from "./getPool_TotalBalance.script";

export const GET_POOL_LIST = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

access(all) fun main(): [&CoinFlip.Pool] {
  let ids = CoinFlip.getAllPoolId()
  var pools : [&CoinFlip.Pool] = []
  for id in ids{
      let poolRef = CoinFlip.borrowPool(id:id)
      pools.append(poolRef)
  }
  return pools
}`;

export const getPoolList = async (userAddress) => {
  try {
    const response = await fcl.query({
      cadence: GET_POOL_LIST,
    });
    console.log("Pool list=>", response);
    if (!userAddress) {
      return response;
    }
    return await Promise.all(
      response.map(async (pool) => {
        const poolId = pool.id;
        const coinSide = pool.tossResult;
        const poolSize = await getPoolTotalBalance(poolId);
        console.log("Pool id=>", poolId, "Coin side=>", coinSide);
        const user = await getSingleUserInfo(poolId, userAddress, coinSide);
        console.log("user", user);
        return {
          ...pool,
          poolSize,
          amount: user?.bet_amount || 0,
          winnings: user?.claim_amount,
          bet: user?.choice,
          claimed: user?.claimed,
        };
      })
    );
  } catch (error) {
    console.error("Not able to fetch pool list:", error);
  }
};
