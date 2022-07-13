import logo from "./logo.svg";
import "./App.css";
import Moralis from "moralis";

function App() {
  const swap = async () => {
    await Moralis.initPlugins();
    let dex = Moralis.Plugins.oneInch;
    await Moralis.enableWeb3();

    if (!Moralis.User.current()) {
      await Moralis.authenticate();
    }

    // console.log(dex);

    const FROM_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    const TO_TOKEN_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
    const USER_ADDRESS = "0xB778AC3E4bEf931DbD3C39b71C15F00A773d596f";
    const AMOUNT = Number(Moralis.Units.ETH("0.01"));
    const CHAIN = "eth";

    //eth to usdt
    let opts = {
      chain: CHAIN, // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: FROM_TOKEN_ADDRESS, // The token you want to swap
      toTokenAddress: TO_TOKEN_ADDRESS, // The token you want to receive
      amount: AMOUNT,
      fromAddress: USER_ADDRESS, // Your wallet address
      slippage: 1,
      // fromAddress: "0x6217e65d864d77DEcbFF0CFeFA13A93f7C1dD064", // Your wallet address
    };

    const receipt = await dex.swap(opts);
    console.log(receipt);

    // console.log(opts);
  };

  return (
    <div className="App">
      <main>
        <h1>Swap ETH to 1inch 🪙</h1>
        <div className="input-container">
          <input placeholder="Amount of ETH" type="number" />
          <button onClick={swap}>Swap</button>
        </div>
      </main>
    </div>
  );
}

export default App;
