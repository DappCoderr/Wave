export const GET_TOTAL_POOL = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

access(all) fun main(): UInt64{
    return CoinFlip.totalPools
}`;
