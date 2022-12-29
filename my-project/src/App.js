import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { contractAbi, contractAddress } from './utils/constants';
import { useEffect, useState } from 'react';
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

const currentTimestampInSeconds = Math.round(Date.now() / 1000);

const web3 = new Web3("ws://localhost:8545")
const lockContract = new web3.eth.Contract(contractAbi, contractAddress);

const App = () => {
  const [newGreetings, setNewGreetings, greetings, setGreetings] = useState("");
  //const [greetings, setGreetings] = useState("")
  //const { activate, deactivate } = useWeb3React();

  useEffect(() => async () => {
    setGreetings = await greetMe()
    //setGreetings(greetMsg);
    console.log('Hello! 111');
  }, [])

  const greetMe = async () => {
    const greetMsg = await lockContract.methods.greet().call();
    return greetMsg;
  }

  const updateGreets = async () => {
    const greetMsg = await lockContract.methods.setGreeting(newGreetings).send(
      { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' }
    )
    setGreetings(await greetMe())
  }

  return (
    <div className="App">
      <input placeholder="New greetings" type="text" value={newGreetings}
        onChange={(e) => setNewGreetings(e.target.value)}
      />
      <button onClick={() => updateGreets()}>
        Update Greetings
      </button>
      <h2>
        Current Greetings:
        <span style={{ color: "blueviolet" }}>
          {greetings}
        </span>
      </h2>
      <div>
        hi!!!!!!!!!!!!!!
      </div>
    </div>
  );
}

export default App;
