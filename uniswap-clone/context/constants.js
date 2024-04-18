import booToken from './BooToken.json';
import lifeToken from './LifeToken.json';
import singleSwapToken from './SingleSwapToken.json' ;
import swapMultiHop  from "./SwapMultiHop.json";
import iWeth from "./IWETH.json"

export const BOO_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const BOO_ABI = booToken.abi;

export const LIFE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const LIFE_ABI = lifeToken.abi;


export const SINGLESWAP_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
export const  SINGLESWAP_ABI = singleSwapToken.abi;

export const SWAPMULTIHOP_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
export const SWAPMULTIHOP_ABI = swapMultiHop.abi;

export const IWETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETH_ABI = iWeth.abi;