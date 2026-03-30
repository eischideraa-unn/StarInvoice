# StarInvoice SDK

TypeScript SDK wrapper for the StarInvoice Soroban contract.

## Features

- `createInvoice`
- `fundInvoice`
- `markDelivered`
- `approvePayment`
- `releasePayment`

## Quickstart

```bash
cd sdk
npm install
npm run build
```

## Usage

```ts
import { StarInvoiceClient } from "starinvoice-sdk";
import { Keypair, Networks } from "@stellar/stellar-sdk";

const client = new StarInvoiceClient({
  serverUrl: "https://rpc.testnet.soroban.stellar.org",
  contractId: "<contract-id>",
  networkPassphrase: Networks.TESTNET,
});

const signer = Keypair.fromSecret("S...");

await client.createInvoice({
  freelancer: "G...",
  client: "G...",
  amount: "100",
  token: "G...",
  deadline: 9999999999,
  title: "Logo design",
  description: "Design an invoice page",
}, signer);
```

## Tests

```
cd sdk
npm test
```
