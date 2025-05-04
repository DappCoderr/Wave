import * as fcl from "@onflow/fcl";
import { TAIL_SINGLE_USER_INFO } from "./getSingleUserInfo_Tail.script";
export const HEAD_SINGLE_USER_INFO = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

access(all) fun main(id:UInt64, addr: Address) : HeadBet_User{
  pre {
      CoinFlip.totalPools >= id && id != 0: "Pool Does not exist"
  }
  let poolRef = CoinFlip.borrowPool(id:id)
  let myInfo =  poolRef.headInfo[addr]!
  return HeadBet_User(_choise: myInfo.choice, amount: myInfo.bet_amount, claim_amount: myInfo.claim_amount, claimed: myInfo.rewardClaimed)
}

access(all) struct HeadBet_User {
  access(all) let choice: String
  access(all) var bet_amount: UFix64
  access(all) var claim_amount: UFix64
  access(all) var claimed:Bool

  init(_choise:String, amount: UFix64, claim_amount:UFix64, claimed:Bool){
      self.choice = _choise
      self.bet_amount = amount
      self.claim_amount = claim_amount
      self.claimed = claimed
  }
}`;

export const getSingleUserInfo = async (poolId, user, coinSide) => {
  try {
    if (!poolId) {
      throw new Error("Pool id is required");
    }
    if (!coinSide) {
      throw new Error("Coin side is required");
    }
    if (!user) {
      throw new Error("User is required");
    }
    const isHead = coinSide === "HEAD";
    let response = await fcl
      .query({
        cadence: isHead ? HEAD_SINGLE_USER_INFO : TAIL_SINGLE_USER_INFO,
        args: (arg, t) => [arg(poolId, t.UInt64), arg(user, t.Address)],
      })
      .catch((error) => {
        console.log("error in getting ", !isHead);
        return null;
      });

    if (!response) {
      response = await fcl
        .query({
          cadence: !isHead ? HEAD_SINGLE_USER_INFO : TAIL_SINGLE_USER_INFO,
          args: (arg, t) => [arg(poolId, t.UInt64), arg(user, t.Address)],
        })
        .catch((error) => {
          console.log("error in getting not ", !isHead);
          return null;
        });

      if (!response) {
        return false;
      }
    }
    return response;
  } catch (error) {
    console.error("Error in getSingleUserIno:", error);
    return false;
  }
};
