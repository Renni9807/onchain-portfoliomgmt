// src/App.tsx
import WalletConnect from "./Components/WalletConnect";
import BalanceDisplay from "./Components/BalanceDisplay";
import "./index.css";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
        <div className="mt-8 mb-8 w-full max-w-md">
          <WalletConnect />
        </div>
        <div className="mb-8 w-full max-w-md">
          <BalanceDisplay />
        </div>
      </div>
    </div>
  );
}

export default App;
