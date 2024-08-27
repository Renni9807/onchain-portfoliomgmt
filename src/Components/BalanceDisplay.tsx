import {
  useAccount,
  useBalance,
  useContractRead,
  useSendTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { useState } from "react";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
];

const tokens = {
  USDC: {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // mainnet USDC address
    decimals: 6,
    imageUrl: "http://localhost:5050/image/USDC_removebg.png", // S3에서 가져온 이미지 URL
  },
  USDT: {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7", // mainnet USDT address
    decimals: 6,
    imageUrl: "http://localhost:5050/image/USDT_removebg.png", // S3에서 가져온 이미지 URL
  },
  ETH: {
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    decimals: 18,
    imageUrl: "http://localhost:5050/image/eth.png", // S3에서 가져온 이미지 URL
  },
};

export default function BalanceDisplay() {
  const { address, isConnected } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] =
    useState<keyof typeof tokens>("ETH");

  const { data: ethBalance } = useBalance({
    address: address as `0x${string}`,
  });

  const { data: usdcContractBalance } = useContractRead({
    address: tokens.USDC.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: usdtContractBalance } = useContractRead({
    address: tokens.USDT.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  const { sendTransaction } = useSendTransaction();

  const handleSendTransaction = async () => {
    if (!recipient || !amount) {
      alert("Recipient address and amount are required.");
      return;
    }

    try {
      if (selectedToken === "ETH") {
        const txRequest = {
          to: recipient as `0x${string}`,
          value: ethers.parseEther(amount),
        };

        sendTransaction({ to: txRequest.to, value: txRequest.value });
      } else {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = tokens[selectedToken].address;
        const contract = new ethers.Contract(
          contractAddress,
          ERC20_ABI,
          signer
        );

        const amountToSend = ethers.parseUnits(
          amount,
          tokens[selectedToken].decimals
        );

        const tx = await contract.transfer(recipient, amountToSend);
        await tx.wait();

        console.log(`Transaction successful: ${tx.hash}`);
        alert(`Transaction successful: ${tx.hash}`);
      }
    } catch (error: any) {
      console.error(`Transaction failed: ${error.message}`);
      alert(`Transaction failed: ${error.message}`);
    }
  };

  if (!isConnected) return <p>Please connect your wallet to see balances.</p>;

  return (
    <div className="balance-display">
      <h2 className="text-2xl font-bold mb-4">Balances</h2>
      <div className="balance-item flex items-center mb-4">
        <img
          src={tokens.ETH.imageUrl}
          alt="ETH"
          className="token-img w-6 h-6 mr-2"
        />
        <p className="mt-2">ETH Balance: {ethBalance?.formatted} ETH</p>
      </div>
      <div className="balance-item flex items-center mb-4">
        <img
          src={tokens.USDC.imageUrl}
          alt="USDC"
          className="token-img w-6 h-6 mr-2"
        />
        <p className="mt-2">
          USDC Balance:{" "}
          {usdcContractBalance && typeof usdcContractBalance === "bigint"
            ? ethers.formatUnits(usdcContractBalance, tokens.USDC.decimals)
            : "0"}{" "}
          USDC
        </p>
      </div>
      <div className="balance-item flex items-center mb-4">
        <img
          src={tokens.USDT.imageUrl}
          alt="USDT"
          className="token-img w-6 h-6 mr-2"
        />
        <p className="mt-2">
          USDT Balance:{" "}
          {usdtContractBalance && typeof usdtContractBalance === "bigint"
            ? ethers.formatUnits(usdtContractBalance, tokens.USDT.decimals)
            : "0"}{" "}
          USDT
        </p>
      </div>

      {/* Transaction Section */}
      <div className="transaction-section mt-8 p-4 bg-gray-800 rounded-md shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          Send Transaction
        </h3>
        <div className="flex flex-col space-y-4">
          <select
            value={selectedToken}
            onChange={(e) =>
              setSelectedToken(e.target.value as keyof typeof tokens)
            }
            className="p-2 bg-gray-700 text-white rounded border border-gray-600"
          >
            <option value="ETH" className="bg-gray-700">
              ETH
            </option>
            <option value="USDC" className="bg-gray-700">
              USDC
            </option>
            <option value="USDT" className="bg-gray-700">
              USDT
            </option>
          </select>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded border border-gray-600"
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded border border-gray-600"
          />
          <button
            className="bg-gradient-to-r from-[#5E4CBF] to-[#E65177] text-white rounded p-2 mt-2 hover:opacity-90 transition-opacity"
            onClick={handleSendTransaction}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
