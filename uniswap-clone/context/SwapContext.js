"use client"
import React, {useState, useEffect} from 'react'
import Web3Modal from  "web3modal"
import {ethers} from "ethers";

//INTERNAL IMPORT
import {
    checkIfWalletIsConnected,
    connectWallet,
    connectingWithBoo,
    connectingWithLIfe,
    connectingWithSingleSwap,
    connectingWithIweth,
    connectingWithDAI,
  } from "../utils/appFeatures";

import {IWETH_ABI} from "./constants"
import ERC20 from "./ERC20.json"

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider =  ({children}) =>{
    //USSTATE
    const [account, setAccount] = useState("");
    const [ether, setEther] = useState("");
    const [networkConnect, setNetworkConnect] = useState("");
    const [weth9, setWeth9] = useState("");
    const [dai, setDai] = useState("");

    const [tokenData, setTokenData] = useState([]);

    const addToken = [
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        // "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        // "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
      ];

       //FETCH DATA
  const fetchingData = async () => {
    try {
      //GET USER ACCOUNT
      const userAccount = await checkIfWalletIsConnected();
      setAccount(userAccount);
      //CREATE PROVIDER
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.BrowserProvider(connection);

      //CHECK Balance
      const balance = await provider.getBalance(userAccount);
    //   console.log(balance)
      const convertBal = balance.toString();
    //   console.log(convertBal)
      const ethValue = ethers.formatEther(convertBal);
    //   console.log(ethValue)
      setEther(ethValue);

      //GET NETWORK
      const network = await provider.getNetwork();
      setNetworkConnect(network.name);

      //GET ALL TOKEN BALANCE AND DATA
      addToken.map(async (item, index) => {
        const contract = new ethers.Contract(item, ERC20, provider);

        //GET TOKEN BALANCE
        const userBalance = await provider.getBalance(userAccount);
        const tokenAvai = userBalance.toString();
        const convertTokenAvai = ethers.formatEther(tokenAvai);
        console.log("token balance:", convertTokenAvai)

        //GET CONTRACT NAME AND SYMBOL
        const symbol = contract.symbol();
        const name = contract.name();

        tokenData.push({
            name: name,
            symbol: symbol,
            tokenBalance: convertTokenAvai,
        })

        // console.log(tokenData)
      })

    //WETH9 BALANCE
    const weth = await connectingWithIweth();
    const wethBal = await provider.getBalance(weth);
    const wethBalLeft = wethBal.toString();
    const convertWethBalLeft = ethers.formatEther(wethBalLeft);
    setWeth9(convertWethBalLeft);

   // DAI BALANCE
    const daiContract = await connectingWithDAI();
    const daiBal = await provider.getBalance(userAccount);
    const daiBalLeft = daiBal.toString();
    const convertDaiBalLeft = ethers.formatEther(daiBalLeft);
    setDai(convertDaiBalLeft);

    console.log(dai, weth9);

    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
    fetchingData();
    }, []);

    return (
        <SwapTokenContext.Provider value={{ account, weth9, dai, ether, networkConnect }}> 
            {children}
        </SwapTokenContext.Provider>
        );
}