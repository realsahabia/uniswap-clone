"use client"
import React, { useState, useContext } from "react";
import Image from "next/image";

//  INTERNAL IMPORTS
import "./HeroSection.css"
import images from "../../assets"
import {Token, SearchToken} from "../Index";

export default function HeroSection({accounts, tokenData}) {
  //USESTATE
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokensTwo, setOpenTokensTwo] = useState(false);


  //TOKEN 1
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  //TOKEN 2
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  return (
    <div className="HeroSection">
      <div className="HeroSection_box">
        <div className="HeroSection_box_heading">
          <p>Swap</p>
          <div className="HeroSection_box_heading_img">
            <Image
              src={images.close}
              alt="image"
              width={50}
              height={50}
              onClick={() => setOpenSetting(true)}
            />
          </div>
        </div>

        <div className="HeroSection_box_input">
          <input
            type="number"
            placeholder="0"
          />
          <button onClick={() => setOpenToken(true)}>
            <Image
              src={tokenOne.image || images.etherlogo}
              width={20}
              height={20}
              alt="ether"
            />
            {tokenOne.name || "ETH"}
            <small>9000</small>
          </button>
        </div>

        <div className="HeroSection_box_input">
          <input
            type="number"
            placeholder="0"
          />
          <button onClick={() => setOpenToken(true)}>
            <Image
              src={tokenTwo.image || images.etherlogo}
              width={20}
              height={20}
              alt="ether"
            />
            {tokenTwo.name || "ETH"}
            <small>9000</small>
          </button>
        </div>


        {!accounts ? (
          <button
            onClick={() => swapToken()}
            className="HeroSection_box_btn"
          >
            Swap
          </button>
        ) : (
          <button
            onClick={() => connectWallet()}
            className="HeroSection_box_btn"
          >
            Connect Wallet
          </button>
        )}
      </div>
        
      {openSetting && (
        <Token 
        setOpenSetting={setOpenSetting} 
        />
      )}

      {openToken && (
        <SearchToken
          openToken={setOpenToken}
          tokens={setTokenOne}
          tokenData={tokenData}
        />
      )}
      {openTokensTwo && (
        <SearchToken
          openToken={setOpenTokensTwo}
          tokens={setTokenTwo}
          tokenData={tokenData}
        />
      )}
    </div>
  )
}