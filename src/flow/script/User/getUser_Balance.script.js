import * as fcl from "@onflow/fcl";

const USER_FLOW_BALANCE = `
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

access(all) fun main(account: Address): UFix64 {

    let vaultRef = getAccount(account)
        .capabilities.borrow<&FlowToken.Vault>(/public/flowTokenBalance)
        ?? panic("Could not borrow a balance reference to the FlowToken Vault in account "
                .concat(account.toString()).concat(" at path /public/flowTokenBalance. ")
                .concat("Make sure you are querying an address that has ")
                .concat("a FlowToken Vault set up properly at the specified path."))

    return vaultRef.balance
}`;

async function getFlowTokenBalance(address) {
  try {
    const response = await fcl.query({
      cadence: USER_FLOW_BALANCE,
      args: (arg, t) => [arg(address, t.Address)], // Capital "Address"
    });
    return response;
  } catch (error) {
    console.error("Error in getFlowTokenBalance:", error);
    throw error;
  }
}

export default getFlowTokenBalance;
