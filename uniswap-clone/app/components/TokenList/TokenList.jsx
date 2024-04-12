import React from 'react'
import Image from "next/image"

//INTERNAL IMPORT
import "./TokenList.css"
import images from "../../assets"

export default function TokenList() {

    const data = [1, 2, 3, 4, 5, 6, 7]

  return (
    <div className="TokenList">
        <p 
        className="TokenList_close"
        onClick={() => setOpenTokenBox(false)}
        >
            <Image src={images.close} alt="close" width={50} height={50} />
        </p>
        <div className="TokenList_title">
            <h2>Your Token List</h2>
      </div>
      {data.map((el, i) => (
        <div className="TokenList_box">
          <div className="TokenList_box_info">
            <span className="TokenList_box_info_symbol">34</span>
            <p>
              GOLDEN ONE
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
