"use client"
import React, {useContext, useState, useEffect} from 'react'
import Image from "next/image"
import Link from 'next/link'

//IMPORT INTERNAL 
import style from "./Navbar.module.css"
import images from "../../assets"
import { Model, TokenList } from '../Index'

export default function Navbar() {
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
    const [openModel, setModel] = useState(false)
    const [openTokenBox, setOpenTokenBox] = useState(false) 

  return (
    <div className={style.NavBar}>
        <div className={style.NavBar_box}>
            <div className={style.NavBar_box_left}>
                {/* // LOGO IMAGE */}
                <div className={style.NavBar_box_left_img}>
                    <Image src={images.uniswap} alt='logo' width={50} height={50} />
                </div>

                 {/* //MENU ITEMS */}
                <div className={style.NavBar_box_left_menu}>
                    {menuItems.map((el, i) => (
                        <Link
                            key={i + 1}
                            href={{pathname: `${el.name}`, query: `${el.link}`}}
                        >
                            <p className={style.NavBar_box_left_menu_item}>
                                {el.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
           
            {/* //MIDDLE SECTION */}
            <div className={style.NavBar_box_middle}>
                <div className={style.NavBar_box_middle_search}>
                    <div className={style.NavBar_box_middle_search_img}>
                        <Image src={images.search} alt='search' width={20} height={20} />
                        {/* //IMPUT SECTION */}
                    </div>
                    <input type='text' placeholder='Search Tokens' />
                </div>
            </div>

            {/* //RIGHT SECTION */}
            <div className={style.NavBar_box_right}>
                <div className={style.NavBar_box_right_box}>
                    <div className={style.NavBar_box_right_box_img}>
                        <Image src={images.ether} alt='Network' width={30} height={30} />
                    </div>
                    <p>Network Name</p>
                </div>
                <button onClick={() => {}}>Address</button>

             {/* //MODEL SECTION */}
                {openModel && (
                    <Model setOpenModel={setOpenModel} connectWallet="Connect" />
                )}
            </div>
        </div>
         {/* //TOKENLIST COMPONENT */}
         {openTokenBox && (
            <TokenList tokenDate="hey" setOpenTokenBox={setOpenTokenBox} />
        )}
    </div>
  )
}
