export const TAIL_SINGLE_USER_INFO = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

access(all) fun main(id:UInt64, addr: Address) : TailBet_User{
    pre {
        CoinFlip.totalPools >= id && id != 0: "Pool Does not exist"
    }
    let poolRef = CoinFlip.borrowPool(id:id)
    let myInfo =  poolRef.tailInfo[addr]!
    return TailBet_User(_choise: myInfo.choice, amount: myInfo.bet_amount, claim_amount: myInfo.claim_amount, claimed: myInfo.rewardClaimed)
}

access(all) struct TailBet_User {
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
