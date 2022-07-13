import logo from "./logo.svg";
import "./App.css";
import Moralis from "moralis";

function App() {
  const swap = async () => {
    try {
      await Moralis.initPlugins();
      let dex = Moralis.Plugins.oneInch;
      await Moralis.enableWeb3();

      if (!Moralis.User.current()) {
        await Moralis.authenticate();
      }

      const FROM_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
      const TO_TOKEN_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
      const USER_ADDRESS = "0xB778AC3E4bEf931DbD3C39b71C15F00A773d596f";
      const AMOUNT = 0.01;
      const CHAIN = "eth";

      let opts = {
        chain: CHAIN,
        fromTokenAddress: FROM_TOKEN_ADDRESS,
        toTokenAddress: TO_TOKEN_ADDRESS,
        amount: AMOUNT,
        fromAddress: USER_ADDRESS,
        slippage: 1,
      };

      const receipt = await dex.swap(opts);
      console.log(receipt);
    } catch (e) {
      alert(e.message.text);
    }
  };

  return (
    <div className="App">
      <main>
        <h1>Swap ETH to USDT 🪙</h1>
        <div className="input-container">
          <input placeholder="Amount of ETH" type="number" />
          <button onClick={swap}>Swap</button>
        </div>
      </main>
    </div>
  );
}

export default App;
