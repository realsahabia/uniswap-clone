import {ethers} from "ethers";
import Web3Modal from 'web3modal';

import {
    BOO_ADDRESS,
    BOO_ABI,
    LIFE_ADDRESS,
    LIFE_ABI,
    SINGLESWAP_ADDRESS,
    SINGLESWAP_ABI,
    SWAPMULTIHOP_ADDRESS,
    SWAPMULTIHOP_ABI,
    IWETH_ADDRESS,
    IWETH_ABI   
} from "../context/constants" 

//CHECK IF WALLET IS CONNECTED
export const checkIfWalletIsConnected = async () => {
    try{
        if (!window.ethereum) return console.log("Please install Metamask");
        const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
        });

        const firstAccount  = accounts[0];
        return firstAccount;  
    } catch (error) {
        console.log(error);
    }
}

// CONNECT WALLET 
export const connectWallet = async () => {
    try{
        if (!window.ethereum) return console.log("Please install Metamask");
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });

        const firstAccount  = accounts[0];
        return firstAccount;  
    } catch (error) {
        console.log(error);
    }
}

// CONNECTING WITH THE BOOTOKEN
export const connectingWithBoo = async () => {
    try {
        let web3Modal = new Web3Modal();
        const connection  = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner()
    } catch (error) {
        console.log('Error', error);
    }
}