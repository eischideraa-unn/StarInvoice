import { describe, it, expect, vi } from "vitest";
import { StarInvoiceClient } from "../src/index";

const fakeOptions = {
  serverUrl: "https://example.com",
  contractId: "DEADBEEF",
  networkPassphrase: "Test SDF Network ; September 2015",
};

describe("StarInvoiceClient", () => {
  const createInvoker = async () => null;

  it("should have core methods", async () => {
    const client = new StarInvoiceClient(fakeOptions, createInvoker);

    expect(typeof client.createInvoice).toBe("function");
    expect(typeof client.fundInvoice).toBe("function");
    expect(typeof client.markDelivered).toBe("function");
    expect(typeof client.approvePayment).toBe("function");
    expect(typeof client.releasePayment).toBe("function");
  });

  it("createInvoice should not throw a synchronous error when called with minimal params", async () => {
    const client = new StarInvoiceClient(fakeOptions, createInvoker);
    const signer = { publicKey: () => "GABC", secret: "SABC" } as any;

    const call = client.createInvoice(
      {
        freelancer: "GABC",
        client: "GXYZ",
        amount: "1000",
        token: "GTOKEN",
        deadline: 100000,
        title: "Test",
        description: "Test",
      },
      signer
    );

    await expect(call).resolves.toBe(0);
  });
});
