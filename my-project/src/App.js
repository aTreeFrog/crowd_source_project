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
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";


const currentTimestampInSeconds = Math.round(Date.now() / 1000);
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

var projectData = {
  projectName: "",
  projectState: "",
  projectOwner: "",
  crowdData: ""
};

//const web3 = new Web3("ws://localhost:8545")
const lockContract = new web3.eth.Contract(contractAbi, contractAddress);
console.log(lockContract.methods)


const App = () => {
  const [greetings, setGreetings] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
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

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const createProject = async () => {

    // const myProject = {
    //   to: contractAddress, // Required except during contract publications.
    //   from: walletAddress,
    //   'data': await lockContract.methods.createProject(greetings, 1)
    // }

    // console.log("made it past createProject part 1")

    // console.log(window.ethereum)

    // const txHash = await window.ethereum
    //   .request({
    //     method: 'eth_sendTransaction',
    //     params: [myProject],
    //   });

    // setStatus("✅ Check out your pay project transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash);

    await lockContract.methods.createProject(greetings, 1).send(
      { from: walletAddress }
    )

    console.log("HI THERE")

    const lastProject = await lockContract.methods.obtainProjectDetails(1).call(
      { from: walletAddress }
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
    web3.eth.getBalance(walletAddress)
      .then(console.log);

    // convert eth to wei
    const valueInWei = web3.utils.toWei(amount, 'ether')

    //send money to contract
    try {
      const sendTransaction = await web3.eth.sendTransaction({
        from: walletAddress,
        to: contractAddress,
        value: valueInWei, // Convert to wei value
        'data': await lockContract.methods.deposit().encodeABI()
      });
      setStatus(`Transaction sent! Hash: ${sendTransaction.transactionHash}`);

      // update amount user provided in project
      //   try {

      //     const payProjectTransactionParameters = {
      //       to: contractAddress, // Required except during contract publications.
      //       from: walletAddress, // must match user's active address.
      //       'data': await lockContract.methods.updateContributerAmount(id, amount) //make call to smart contract 
      //     };

      //     //sign transaction via Metamask
      //     const txHash = await window.ethereum
      //       .request({
      //         method: 'eth_sendTransaction',
      //         params: [payProjectTransactionParameters],
      //       });
      //     setStatus("✅ Check out your pay project transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash);
      //   }
      //   catch (error) {
      //     setStatus("😥 Something went wrong: " + error.message)
      //   }
    }
    catch (error) {
      setStatus(`Error sending transaction: ${error.message}`);
    }
  }

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



  const onMintPressed = async () => {
    const { status } = await mintNFT(url, name, description);
    setStatus(status);

  };




  return (
    <div className="App">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <p id="status">
        {status}
      </p>
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
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
    </div>
  );

}

export default App;
