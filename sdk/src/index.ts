import { Keypair } from "@stellar/stellar-sdk";
import { InvoiceContractBindings, createStarInvoiceBindings } from "./bindings";

export interface CreateInvoiceParams {
  freelancer: string;
  client: string;
  amount: string;
  token: string;
  deadline: number;
  title: string;
  description: string;
}

export interface StarInvoiceOptions {
  serverUrl: string;
  contractId: string;
  networkPassphrase: string;
}

export type ContractInvoker = (method: string, args: Array<string | number>, signer: Keypair) => Promise<any>;

export class StarInvoiceClient {
  public bindings: InvoiceContractBindings;
  private invoker: ContractInvoker;

  constructor(options: StarInvoiceOptions, invoker: ContractInvoker) {
    this.bindings = createStarInvoiceBindings(options).bindings;
    this.invoker = invoker;
  }

  async createInvoice(params: CreateInvoiceParams, signer: Keypair): Promise<number> {
    const result = await this.invoker("create_invoice", [
      params.freelancer,
      params.client,
      params.amount,
      params.token,
      params.deadline,
      params.title,
      params.description,
    ], signer);
    return Number(result?.invoice_id ?? result ?? 0);
  }

  async fundInvoice(invoiceId: number, tokenAddress: string, signer: Keypair): Promise<void> {
    await this.invoker("fund_invoice", [invoiceId, tokenAddress], signer);
  }

  async markDelivered(invoiceId: number, signer: Keypair): Promise<void> {
    await this.invoker("mark_delivered", [invoiceId], signer);
  }

  async approvePayment(invoiceId: number, signer: Keypair): Promise<void> {
    await this.invoker("approve_payment", [invoiceId], signer);
  }

  async releasePayment(invoiceId: number, tokenAddress: string, signer: Keypair): Promise<void> {
    await this.invoker("release_payment", [invoiceId, tokenAddress], signer);
  }

  static defaultInvoker(options: StarInvoiceOptions): ContractInvoker {
    return async (method, args, signer) => {
      throw new Error("defaultInvoker is not implemented. Use a Soroban wallet or RPC helper.");
    };
  }
}
