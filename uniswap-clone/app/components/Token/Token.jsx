"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import "./Token.css";
import images from "../../assets";
import { Toggle } from "../Index";

export default function Token({setOpenSetting}) {

  return (
    <div className="Token">
      <div className="Token_box">
        <div className="Token_box_heading">
          <h4>Setting</h4>
          <Image
            src={images.close}
            alt="close"
            width={50}
            height={50}
            onClick={() => setOpenSetting(false)}
          />
        </div>

        <div className="Token_box_content">
          <p className="Token_box_para">
            Slippage tolerance{""}
            <Image src={images.lock} alt="img" width={20} height={20} />
          </p>

          <div className="Token_box_input">
            <button>Auto</button>
            <input
              type="text"
              placeholder="slipage"
            />
          </div>
        </div>
        <div className="Token_box_content">
          <p className="Token_box_para">
            Slippage tolerance{""}
            <Image src={images.lock} alt="img" width={20} height={20} />
          </p>

          <div className="Token_box_input">
            <button>Auto</button>
            <input
              type="text"
              placeholder="slipage"
            />
          </div>
        </div>

        <div className="Token_box_content">
          <p className="Token_box_para">
            Deadline Time{""}
            <Image src={images.lock} alt="img" width={20} height={20} />
          </p>

          <div className="Token_box_input">
            <input
              type="text"
              placeholder="deadline"
            />
            <button>minutes</button>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <h2>Interface Setting</h2>

          <div className="Token_box_toggle">
            <p className="Token_box_para">Transaction deadline</p>
          <Toggle label="No"/>
          </div>
        </div>
      </div>
    </div>
  )
}
