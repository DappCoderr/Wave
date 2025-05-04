export const HEAD_VAULT_BALANCE = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

access(all) fun main(id:UInt64): UFix64{
    pre {
        CoinFlip.totalPools >= id && id != 0: "Pool Does not exist"
    }
    let poolRef = CoinFlip.borrowPool(id:id)
    return poolRef.getHeadBalance()
}`;
