"use client"
import React, {useContext, useState, useEffect} from 'react'
import Image from "next/image"
import Link from 'next/link'

//IMPORT INTERNAL 
import "./Navbar.css"
import images from "../../assets"
import { Model, TokenList } from '../Index'
import { use } from 'chai'
import { SwapTokenContext } from '@/context/SwapContext'

export default function Navbar() {
    const {ether, account, networkConnect, connectWallet, tokenData} = useContext(SwapTokenContext)

    const menuItems = [
        {
            name: "Swap",
            link: "/"
        },
        {
            name: "Tokens",
            link: "/"
        },
        {
            name: "Pools",
            link: "/"
        }
    ]

    //USESTATE
    const [openModel, setOpenModel] = useState(false)
    const [openTokenBox, setOpenTokenBox] = useState(false) 
    // const [account, setAccount] = useState(true)

  return (
    <div className="NavBar">
        <div className="NavBar_box">
            <div className="NavBar_box_left">
                {/* // LOGO IMAGE */}
                <div className="NavBar_box_left_img">
                    <Image src={images.uniswap} alt='logo' width={50} height={50} />
                </div>

                 {/* //MENU ITEMS */}
                <div className="NavBar_box_left_menu">
                    {menuItems.map((el, i) => (
                        <Link
                            key={i + 1}
                            href={{pathname: `${el.name}`, query: `${el.link}`}}
                        >
                            <p className="NavBar_box_left_menu_item">
                                {el.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
           
            {/* //MIDDLE SECTION */}
            <div className="NavBar_box_middle">
                <div className="NavBar_box_middle_search">
                    <div className="NavBar_box_middle_search_img">
                        <Image src={images.search} alt='search' width={20} height={20} />
                        {/* //IMPUT SECTION */}
                    </div>
                    <input type='text' placeholder='Search Tokens' />
                </div>
            </div>

            {/* //RIGHT SECTION */}
            <div className="NavBar_box_right">
                <div className="NavBar_box_right_box">
                    <div className="NavBar_box_right_box_img">
                        <Image src={images.ether} alt='Network' width={30} height={30} />
                    </div>
                    <p>{networkConnect}</p>
                </div>
                    {account ? (
                            <button onClick={() => setOpenTokenBox(true)}>{account.slice(0, 15)}</button>

                        ) :  (
                            <button onClick={() => setOpenModel(true)}>Connect</button>
                        )
                    }
                    {/* //MODEL SECTION */}
                        {openModel && (
                            <Model setOpenModel={setOpenModel} connectWallet={connectWallet} />
                    )}
            </div>
        </div>
         {/* //TOKENLIST COMPONENT */}
         {openTokenBox && (
            <TokenList tokenData={tokenData} setOpenTokenBox={setOpenTokenBox} />
        )}
    </div>
  )
}
