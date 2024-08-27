import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="wallet-connect">
      <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
      {isConnected ? (
        <>
          <p>Connected as: {address}</p>
          <button
            className="bg-red-800 text-white py-2 px-4 rounded mt-4 hover:bg-red-700 transition"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </>
      ) : (
        <div className="flex flex-col space-y-2">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
              onClick={() => connect({ connector })}
            >
              Connect with {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
