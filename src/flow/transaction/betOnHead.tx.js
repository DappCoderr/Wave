export const BET_ON_HEAD = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import CoinFlip from 0xCoinFlip

transaction(id:UInt64, amount:UFix64){
    let Payment: @FlowToken.Vault
    let Buyer: Address

    prepare(signer: auth(BorrowValue) &Account) {
        let flowVault = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(from: /storage/flowTokenVault)!
        self.Payment <- flowVault.withdraw(amount: amount) as! @FlowToken.Vault
        self.Buyer = signer.address
    }
    execute{
        let poolRef = CoinFlip.borrowPool(id: id)
        poolRef.betOnHead(_addr: self.Buyer, poolId: id, amount: <- self.Payment)
    }
} `;
