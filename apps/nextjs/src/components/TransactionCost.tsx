import {
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AlertCircle } from "lucide-react";

import { type userOpType } from "@skylarScan/schema/src/evmTransaction";

import { formatEvmAddress } from "~/utils/blockchain";
import { CopyPopover, IconDefault } from "~/components/CopyIcon";

interface props {
  data: userOpType;
  size: string;
}

function TransactionCost({ data, size }: props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const value = Number(data?.transactionCost);
  const valueRounded = value.toFixed(
    3 - Math.floor(Math.log(value) / Math.log(10)),
  );

  const paymasterValue =
    data.parsedUserOp.paymasterAndData &&
    data.parsedUserOp.paymasterAndData.slice(0, 42);

  return (
    <Flex
      alignItems="center"
      gap={`var(--chakra-fontSizes-${size})`}
      marginTop="0"
    >
      <Text fontSize={size} color="gray.400">
        ${valueRounded}ETH
      </Text>

      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="copy"
            size={"1"}
            variant="ghost"
            _hover={{ backgroundColor: "transparent" }}
            isDisabled={isOpen}
            icon={<IconDefault icon={AlertCircle} size={size} />}
          />
        </PopoverTrigger>

        <Box
          as={PopoverContent}
          _focusVisible={{
            boxShadow: "none",
          }}
        >
          <PopoverArrow />
          <PopoverBody>
            <Flex alignItems={"center"}>
              <Text
                fontSize="xxs"
                noOfLines={3}
                textAlign="center"
                width={"fit-content"}
              >
                {`${data?.gasData.gasUsed} out of ${
                  data?.gasData.gasLimit
                } @ ${Number(data?.gasData.gasPrice).toFixed(
                  2,
                )} gwei / gas. Sponsored by ${formatEvmAddress(
                  paymasterValue,
                )}`}
              </Text>
              <CopyPopover content={paymasterValue} size={size} />
            </Flex>
          </PopoverBody>
        </Box>
      </Popover>
    </Flex>
  );
}

export default TransactionCost;
