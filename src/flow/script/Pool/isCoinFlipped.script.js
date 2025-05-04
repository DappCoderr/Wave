export const IS_COIN_FLIPPED = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

access(all) fun main(id:UInt64): Bool{
    pre {
        CoinFlip.totalPools >= id && id != 0: "Pool Does not exist"
    }
    let poolRef = CoinFlip.borrowPool(id:id)
    return poolRef.coinFlipped
}`;
