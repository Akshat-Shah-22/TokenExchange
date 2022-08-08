import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar/Navbar';

const App = () => {
  const [mounted, setMounted] = useState(false);
  const[account, setAccount] = useState("");
  const[ethBalance, setEthBalance] = useState(0);

  const loadWeb3 = async () =>{
    let {ethereum} = window;
    if(ethereum){
      window.web3 = new Web3(ethereum)
      await ethereum.enable();
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert("Non ethereum based browser detected");
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    //fetch account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    //fetch balance of that account
    const eth_Balance = await web3.eth.getBalance(accounts[0]);
    setEthBalance(eth_Balance);
  }

  if(!mounted){
    // Code for componentWillMount here
    // This code is called only one time before intial render
    loadWeb3();
    loadBlockchainData();
  }

  useEffect(() => {
    setMounted(true);
  }, [])

  return (
    <div>
        <Navbar account={account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h2>Hello, World!</h2>
              </div>
            </main>
          </div>
        </div>
      </div>
  )
}

export default App
