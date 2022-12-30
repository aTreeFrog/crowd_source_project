import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { contractAbi, contractAddress } from './utils/constants';
import { useEffect, useState } from 'react';
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers';

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

var projectData = {
  projectName: "",
  projectState: "",
  projectOwner: "",
  crowdData: ""
};


const web3 = new Web3("ws://localhost:8545")
const lockContract = new web3.eth.Contract(contractAbi, contractAddress);
console.log(lockContract.methods)

const App = () => {
  const [greetings, setGreetings] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  //const [greetings, setGreetings] = useState("")
  //const { activate, deactivate } = useWeb3React();

  useEffect(() => async () => {
    const greetMsg = await greetMe();
    console.log(`this is initial greetMsg: ${greetMsg}`);
    setGreetings("Type Project Name");
    //await updateGreets();
  }, [])

  const greetMe = async () => {
    const greetMsg = await lockContract.methods.greet().call();
    return greetMsg;
  }

  const updateGreets = async () => {
    const greetMsg = await lockContract.methods.setGreeting(greetings).send(
      { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' }
    )
  }

  const createProject = async () => {
    await lockContract.methods.createProject(greetings, 1).send(
      { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' }
    )

    const lastProject = await lockContract.methods.obtainProjectDetails(1).call(
      { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' }
    )

    console.log(lastProject)

    projectData = {
      projectName: lastProject[0],
      projectState: lastProject[1],
      projectOwner: lastProject[2],
      crowdData: lastProject[3]
    };

    console.log(projectData)
  }

  const payProject = async (id, amount) => {

    //grabs balance of current account
    web3.eth.getBalance("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266")
      .then(console.log);

    await lockContract.methods.updateContributerAmount(id, amount).send(
      { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' });

    //ToDo: sending eth to this contract is creating error. Must figure out why.
    // await web3.eth.sendTransaction({
    //   from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    //   to: contractAddress,
    //   value: web3.utils.toWei(amount, "ether") // Convert to wei value
    // });

    // , async function (err, hash) {
    //   if (!err) {
    //     console.log('Txn Sent and hash is ' + hash);

    //     // updates the object with the new eth amount for that user
    //     await lockContract.methods.updateContributerAmount(1, Number(amount)).send(
    //       { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' }
    //     )

    //   }
    //   else {
    //     console.error(err);
    //   }
    // });
  }



  return (
    <div className="App">
      <input placeholder="Type Project Name" type="text" value={greetings}
        onChange={(e) => setGreetings(e.target.value)}
      />
      <button onClick={() => createProject()}>
        Add Project
      </button>
      <div>
        <input placeholder="Add Eth to Project" type="text" value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
        />
        <button onClick={() => payProject(1, ethAmount)}>
          Fund Project
        </button>
      </div>
      <h2>
        Project Data:
        <span style={{ color: "blueviolet" }}>
          <div>
            Name: {projectData.projectName}
          </div>
          <div>
            Owner Address: {projectData.projectOwner}
          </div>
          <div>
            Participants: {projectData.crowdData}
          </div>
        </span>
      </h2>
    </div>
  );
}

export default App;
