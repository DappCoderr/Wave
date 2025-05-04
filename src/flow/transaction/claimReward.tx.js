export const CLAIM_REWARD = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

transaction(id:UInt64){
    let Buyer: Address
    prepare(signer:&Account){
        self.Buyer = signer.address
    }
    execute{
        CoinFlip.claimReward(poolId: id, userAddress: self.Buyer)
    }
}`;
