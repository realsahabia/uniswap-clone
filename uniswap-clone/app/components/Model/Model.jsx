"use client"
import React, {useState, useEffect} from 'react';
import Image from "next/image";

//INTERNAL IMPORT
import './Model.css'
import images from "./../../assets"


export default function Model({setOpenModel, connectWallet}){
    const walletMenu = ["MetaMask", "Coinbase", "Wallet", "WalletConnect"];

  return (
    <div className="Model">
        <div className="Model_box">
            <div className="Model_box_heading">
                <p>Connect Wallet</p>
                <div className="Model_box_heading_img">
                    <Image src={images.close}  
                    alt="Close Button" 
                    width="50"
                    height="50"
                    onClick={()=> setOpenModel(false)}/>
                </div>
            </div>
            <div className="Model_box_wallet"> 
                {walletMenu.map((el, i) => (
                    <p 
                    key={i + 1} 
                    onClick={() =>connectWallet()}>{el}
                    </p>
                ))}
            </div>
            <p className="Model_box_para">
                By connecting your wallet you agree to our 
                <br />Terms of Service and Privacy Policy.
            </p>
        </div>
    </div>
  )
}
