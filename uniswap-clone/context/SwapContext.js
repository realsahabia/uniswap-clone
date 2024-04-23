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
    connectingWithSigleSwap,
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
      // console.log("Connection Data:", connection)
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
        try {
            const contract = new ethers.Contract(item, ERC20, provider);

            // Get token balance using the balanceOf function
            const userBalance = await contract.balanceOf(userAccount);
            const tokenAvai = userBalance.toString();
            const convertBal = ethers.formatEther(tokenAvai);
            console.log(convertBal)

            const symbol = await contract.symbol();
            const name = await contract.name();
    
            // console.log("Name and Symbol:", name, symbol);
    
            // addToken.push({
            //   name: name,
            //   symbol: symbol,
            //   tokenBalance: convertBal,
            // })
           
            setTokenData(prevTokenData => [
              ...prevTokenData,
              {
                  name: name,
                  symbol: symbol,
                  tokenBalance: convertBal,
              }
          ]);
        } catch (error) {
            console.log("Error fetching token data:", error);
        }
    });
    

    //WETH9 BALANCE
    const weth = await connectingWithIweth();
    const wethBal = await provider.getBalance(weth);
    const wethBalLeft = wethBal.toString();
    const convertWethBalLeft = ethers.formatEther(wethBalLeft);
    setWeth9(convertWethBalLeft);

   // DAI BALANCE
    const daiContract = await connectingWithDAI();
    const daiBal = await provider.getBalance(daiContract);
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

    //SINGLE SWAP TOKEN
    const singleSwapToken = async () => {
      try {
        let singleSwapToken;
        let weth;
        let dai;

        singleSwapToken = await connectingWithSigleSwap();
        weth = await connectingWithIweth()
        dai = await connectingWithDAI();

        const amountIn = 10n ** 18n

        await weth.deposit({value:amountIn});
        await weth.approve(singleSwapToken.address,amountIn);

        //SWAP
        await singleSwapToken.swapExactInputSingle(amountIn, {
          gasLimit: 300000,
        });

        const balance = await dai.balanceOf(account);
        const balStr = balance.toString();
        const  convertedBalance = ethers.formatEther(balStr);
        setDai("DAI Balance:", convertedBalance);

      }catch(error){
        console.log(error);  
      }
    }

    return (
        <SwapTokenContext.Provider value={{tokenData, ether, weth9, account, dai, networkConnect, connectWallet, singleSwapToken}}> 
            {children}
        </SwapTokenContext.Provider>
        );
}