export const CREATE_POOL = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

transaction(){
    let adminRef: &CoinFlip.Admin
    prepare(signer:AuthAccount){
        self.adminRef = signer.borrow<&CoinFlip.Admin>(from: /storage/CoinFlipGameManager) 
                            ?? panic("Account does not store an object at the specified path")
    }
    execute{
        self.adminRef.createPool()
    }
}`;
