// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0 < 0.9.0;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken {
    ISwapRouter public constant swapRouter =
        ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    // Event emitted after each swap
    event Swapped(address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut);

    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    function swapExactInputSingle(uint amountIn)
        external
        returns (uint amountOut)
    {
        // Transfer tokens from the sender to this contract
        TransferHelper.safeTransferFrom(
            WETH9,
            msg.sender,
            address(this),
            amountIn
        );
        
        // Approve the swap router to spend the input token
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        // Define the swap parameters
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: WETH9,
                tokenOut: DAI,
                fee: 3000, // Fee in basis points (0.3%)
                recipient: msg.sender, // Recipient of the output tokens
                deadline: block.timestamp, // Deadline for the swap
                amountIn: amountIn, // Exact amount of WETH9 to be swapped
                amountOutMinimum: 0, // Minimum acceptable amount of DAI to receive
                sqrtPriceLimitX96: 0 // No price limit specified
            });

        // Execute the swap
        amountOut = swapRouter.exactInputSingle(params);

        // Emit the swap event
        emit Swapped(WETH9, DAI, amountIn, amountOut);
    }

    function swapExactOutputSingle(uint amountOut, uint amountInMaximum)
        external
        returns (uint amountIn)
    { 
        // Transfer tokens from the sender to this contract
        TransferHelper.safeTransferFrom(
            WETH9,
            msg.sender,
            address(this),
            amountInMaximum
        );

        // Approve the swap router to spend the input token
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountInMaximum);

        // Define the swap parameters
        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter
            .ExactOutputSingleParams({
                tokenIn: WETH9,
                tokenOut: DAI,
                fee: 3000, // Fee in basis points (0.3%)
                recipient: msg.sender, // Recipient of the output tokens
                deadline: block.timestamp, // Deadline for the swap
                amountOut: amountOut, // Exact amount of token2 to receive
                amountInMaximum: amountInMaximum, // Maximum acceptable amount of token1 to spend
                sqrtPriceLimitX96: 0 // No price limit specified
            });

        // Execute the swap
        amountIn = swapRouter.exactOutputSingle(params);

        // If the actual input amount is less than the maximum specified input amount,
        // refund any leftover tokens to the sender
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(WETH9, address(swapRouter), 0);
            TransferHelper.safeTransfer(
                WETH9,
                msg.sender,
                amountInMaximum - amountIn
            );
        }

        // Emit the swap event
        emit Swapped(WETH9, DAI, amountIn, amountOut);
    }
}