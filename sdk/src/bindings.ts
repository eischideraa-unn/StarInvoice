export type InvoiceStatus = "Pending" | "Funded" | "Delivered" | "Approved" | "Completed" | "Disputed";

export interface InvoiceContractBindings {
  create_invoice(
    freelancer: string,
    client: string,
    amount: string,
    token: string,
    deadline: number,
    title: string,
    description: string
  ): Promise<number>;

  fund_invoice(invoice_id: number, token_address: string): Promise<void>;
  mark_delivered(invoice_id: number): Promise<void>;
  approve_payment(invoice_id: number): Promise<void>;
  release_payment(invoice_id: number, token_address: string): Promise<void>;
}

export interface StarInvoiceBindingsOptions {
  serverUrl: string;
  contractId: string;
  networkPassphrase: string;
}

export function createStarInvoiceBindings(_options: StarInvoiceBindingsOptions): { bindings: InvoiceContractBindings } {
  const binding: InvoiceContractBindings = {
    async create_invoice() {
      throw new Error("create_invoice binding not implemented; use StarInvoiceClient with backend invoker");
    },
    async fund_invoice() {
      throw new Error("fund_invoice binding not implemented; use StarInvoiceClient with backend invoker");
    },
    async mark_delivered() {
      throw new Error("mark_delivered binding not implemented; use StarInvoiceClient with backend invoker");
    },
    async approve_payment() {
      throw new Error("approve_payment binding not implemented; use StarInvoiceClient with backend invoker");
    },
    async release_payment() {
      throw new Error("release_payment binding not implemented; use StarInvoiceClient with backend invoker");
    },
  };

  return { bindings: binding };
}
