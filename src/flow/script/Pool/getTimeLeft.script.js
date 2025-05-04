export const GET_TIME_LEFT = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

access(all) fun main(id:UInt64): Int{
    pre {
        CoinFlip.totalPools >= id && id != 0: "Pool Does not exist"
    }
    let poolRef = CoinFlip.borrowPool(id:id)
    if Int(Int(poolRef.endTime) - Int(getCurrentBlock().timestamp)) > 0{
        return Int(poolRef.endTime - getCurrentBlock().timestamp)
    }else{
        return 0
    }
}`;
