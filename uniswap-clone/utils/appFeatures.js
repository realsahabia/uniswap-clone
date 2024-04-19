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

//FETCHING CONTRACTS ------------------

// FETCHING BOO TOKEN 
export const fetchBooContract = (signerOrProvider) => new ethers.Contract(BOO_ADDRESS, BOO_ABI, signerOrProvider);

// CONNECTING WITH THE BOOTOKEN CONTRACT
export const connectingWithBoo = async () => {
    try {
        let web3Modal = new Web3Modal();
        const connection  = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();

        const contract = fetchBooContract(signer);
        return contract;
    } catch (error) {
        console.log('Error', error);
    }
}

// FETCHING LIFE TOKEN CONTRACT
export const fetchLifeContract = (signerOrProvider) => new ethers.Contract(LIFE_ADDRESS, LIFE_ABI, signerOrProvider);

// CONNECTING WITH THE LIFETOKEN
export const connectingWithLife = async () => {
    try {
        let web3Modal = new Web3Modal();
        const connection  = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();

        const contract = fetchLifeContract(signer);
        return contract;
    } catch (error) {
        console.log('Error', error);
    }
}

// FETCHING SINGLESWAP CONTRACT
export const fetchSingleSwapContract = (signerOrProvider) => new ethers.Contract(SINGLESWAP_ADDRESS, SINGLESWAP_ABI, signerOrProvider);

// CONNECTING WITH THE SINGLESWAPTOKEN CONTRACT
export const connectingWithSigleSwap = async () => {
    try {
        let web3Modal = new Web3Modal();
        const connection  = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();

        const contract = fetchSingleSwapContract(signer);
        return contract;
    } catch (error) {
        console.log('Error', error);
    }
}

// FETCHING SWAPMULTIHOP CONTRACT
export const fetchSwapMultiHopContract = (signerOrProvider) => new ethers.Contract(SWAPMULTIHOP_ADDRESS, SWAPMULTIHOP_ABI, signerOrProvider);

// CONNECTING WITH THE SWAPMULTIHOP CONTRACT
export const connectingWithSwapMultiHop = async () => {
    try {
        let web3Modal = new Web3Modal();
        const connection  = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();

        const contract = fetchSwapMultiHopContract(signer);
        return contract;
    } catch (error) {
        console.log('Error', error);
    }
}

// FETCHING IWETH CONTRACT
export const fetchIwethContract = (signerOrProvider) => new ethers.Contract(IWETH_ADDRESS, IWETH_ABI, signerOrProvider);

// CONNECTING WITH THE IWETH CONTRACT
export const connectingWithIweth = async () => {
    try {
        let web3Modal = new Web3Modal();
        const connection  = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();

        const contract = fetchIwethContract(signer);
        return contract;
    } catch (error) {
        console.log('Error', error);
    }
}

// FETCHING DAI CONTRACT
const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const fetchDAIContract = (signerOrProvider) => new ethers.Contract(DAI_ADDRESS, IWETH_ABI, signerOrProvider);

// CONNECTING WITH THE DAI CONTRACT
export const connectingWithDAI = async () => {
    try {
        let web3Modal = new Web3Modal();
        const connection  = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();

        const contract = fetchDAIContract(signer);
        return contract;
    } catch (error) {
        console.log('Error', error);
    }
}