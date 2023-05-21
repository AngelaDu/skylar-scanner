import { type Transaction } from "viem";
import { z } from "zod";

export const EthAddressSchema = z.custom<`0x${string}`>((val) => {
  return _EthAddressSchema.safeParse(val).success;
});
export type EthAddressType = z.infer<typeof EthAddressSchema>;
export const _EthAddressSchema = z.string().regex(/^0x[0-9,a-f,A-F]{40}$/);
export const EthHashSchema = z.custom<`0x${string}`>((val) => {
  return _EthHashSchema.safeParse(val).success;
});
export type EthHashType = z.infer<typeof EthHashSchema>;
export const _EthHashSchema = z.string().regex(/^0x[0-9a-f]{64}$/);
export const BytesSchema = z.string().regex(/^0x[0-9a-f]*$/);
export const BloomFilterSchema = z.string().regex(/^0x[0-9a-f]{512}$/);
export const HexNumberSchema = z.string().regex(/^0x([1-9a-f]+[0-9a-f]*|0)$/);

export const BlockNonceSchema = z.string().regex(/^0x[0-9a-f]{16}$/);
export const BlockTagSchema = z.enum([
  "earliest",
  "finalized",
  "safe",
  "latest",
  "pending",
]);
export const BlockNumberSchema = z.union([HexNumberSchema, BlockTagSchema]);

export const EvmChainIdSchema = z.union([
  z.literal("1"),
  z.literal("5"),
  z.literal("137"),
  z.literal("80001"),
]);
export type EvmChainIdType = z.infer<typeof EvmChainIdSchema>;

export const EvmTransactionClientQuerySchema = z.object({
  txnHash: EthHashSchema.array().length(1),
  chainId: EvmChainIdSchema,
});
export type EvmTransactionClientQueryType = z.infer<
  typeof EvmTransactionClientQuerySchema
>;

export const EvmTransactionQuerySchema = z.object({
  // Open Api must have string type
  txnHash: _EthHashSchema,
  chainId: EvmChainIdSchema,
});
export type EvmTransactionQueryType = z.infer<typeof EvmTransactionQuerySchema>;

export type EvmTransaction = Transaction & {
  nft?: NftType[];
  token?: TokenType[];
};
export const userOpLogSchema = z.object({
  address: EthAddressSchema,
  blockHash: EthHashSchema,
  blockNumber: z.bigint(),
  data: BytesSchema,
  logIndex: z.bigint(),
  removed: z.boolean(),
  //topics: HexNumberSchema.array().length(4),
  transactionHash: EthHashSchema,
  transactionIndex: z.bigint(),
  args: z.object({
    userOpHash: EthHashSchema,
    sender: EthAddressSchema,
    paymaster: EthAddressSchema,
    nonce: z.bigint(),
    success: z.boolean(),
    actualGasCost: z.bigint(),
    actualGasUsed: z.bigint(),
  }),
  eventName: z.string(),
});

export type userOpLogType = z.infer<typeof userOpLogSchema>;

export const userOpSchema = z.object({
  parsedUserOp: z.object({
    sender: EthAddressSchema,
    nonce: z.bigint(),
    initCode: BytesSchema,
    callData: BytesSchema,
    callGasLimit: z.bigint(),
    verificationGasLimit: z.bigint(),
    preVerificationGas: z.bigint(),
    maxFeePerGas: z.bigint(),
    maxPriorityFeePerGas: z.bigint(),
    paymasterAndData: BytesSchema,
    signature: BytesSchema,
  }),
  transactionCost: z.string(),
  userOpHash: EthHashSchema,
  entryPointContract: EthAddressSchema,
  timestamp: z.date(),
  gasData: z.object({
    gasUsed: z.string(),
    gasLimit: z.string(),
    gasPrice: z.string(),
    baseFeePerGas: z.string(),
    tipFeePerGas: z.string(),
    maxFeePerGas: z.string(),
  }),
  rawUserOp: BytesSchema,
  beneficiary: EthAddressSchema,
});
export type userOpType = z.infer<typeof userOpSchema>;

export const TokenSchema = z.object({
  type: z.literal("erc20"),
  contract: EthAddressSchema,
  name: z.string(),
  decimals: z.number(),
  from: EthAddressSchema,
  to: EthAddressSchema,
  amount: z.bigint(),
});
export type TokenType = z.infer<typeof TokenSchema>;

export const NftSchema = z.object({
  type: z.union([
    z.literal("erc721a"),
    z.literal("erc721"),
    z.literal("erc1155"),
  ]),
  contract: EthAddressSchema,
  name: z.string(),
  from: EthAddressSchema,
  to: EthAddressSchema,
  amount: z.bigint(),
  tokenId: z.bigint(),
  imageUrl: z.string(),
});
export type NftType = z.infer<typeof NftSchema>;

export const AssetLogsSchema = z.union([
  TokenSchema.array(),
  NftSchema.array(),
]);

export type AssetLogsType = z.infer<typeof AssetLogsSchema>;
