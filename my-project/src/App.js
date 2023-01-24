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
import React from 'react';
import './App.css';
import { Navbar, Navbar2 } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Events from './pages/events';
import AnnualReport from './pages/annual';
import Teams from './pages/team';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';



const currentTimestampInSeconds = Math.round(Date.now() / 1000);
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);


var projectData = {
  projectName: "",
  projectState: "",
  projectOwner: "",
  crowdData: []
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

    try {

      const myProject = await lockContract.methods.createProject(greetings, 2).send(
        {
          from: walletAddress,
        }
      )

      // const myProject = {
      //   to: contractAddress, // Required except during contract publications.
      //   from: walletAddress,
      //   'data': await lockContract.methods.createProject(greetings, 2).send
      // }
      setStatus("✅ Check out your pay project transaction on Etherscan: https://goerli.etherscan.io/tx/" + myProject.transactionHash);

    }
    catch (error) {
      setStatus(`Error sending transaction: ${error.message}`);
    }


    console.log("made it past createProject part 1")

    console.log("HI THERE")



    const lastProject = await lockContract.methods.obtainProjectDetails(greetings).call(
      {
        from: walletAddress,
      }
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

      //ToDo: Figure out way that if this or paying fails, it doesnt create any false updates..
      const contributeMoney = await lockContract.methods.updateContributerAmount(greetings, (amount)).send(
        {
          from: walletAddress,
        }
      );


      setStatus(`Transaction sent! Hash: " +${sendTransaction.transactionHash}`,
        "✅ Check out your pay project transaction on Etherscan: https://goerli.etherscan.io/tx/" + contributeMoney.transactionHash);

      const lastProject = await lockContract.methods.obtainProjectDetails(greetings).call(
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
    catch (error) {
      setStatus(`Error sending transaction: ${error.message}`);
    }

    //update contribution amount for that user in object




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
      <Router>
        <Navbar />
        <Navbar2 />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/events' element={<Events />} />
          <Route path='/annual' element={<AnnualReport />} />
          <Route path='/team' element={<Teams />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
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
