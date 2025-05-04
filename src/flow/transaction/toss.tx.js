export const ADMIN_TOSS = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

transaction(id:UInt64){
    let adminRef: &CoinFlip.Admin
    prepare(signer: auth(BorrowValue) &Account){
        self.adminRef = signer.storage.borrow<&CoinFlip.Admin>(from: /storage/CoinFlipGameManager) 
                            ?? panic("OBJECT NOT FOUND")
    }
    execute{
        self.adminRef.tossCoin(id: id) 
    }
}`;
