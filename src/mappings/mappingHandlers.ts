import { SubstrateEvent } from "@subql/types";
import { Account, Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const toAddress = event.event.data[1];
  const amount = event.event.data[2];
  const toAccount = await Account.get(toAddress.toString());
  if (!toAccount) {
    await new Account(toAddress.toString()).save();
  }

  const myTransfer = new Transfer(`${event.block.block.header.number.toNumber()}-${event.idx}`,);
  myTransfer.blockNumber = event.block.block.header.number.toBigInt();
  myTransfer.toId = toAddress.toString();
  myTransfer.amount = (amount as Balance).toBigInt();
  await myTransfer.save();
}

