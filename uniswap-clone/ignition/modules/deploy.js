const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployModule", (m) => {

  const booToken = m.contract("BooToken");
  const lifeToken = m.contract("LifeToken");
  const singleSwapTokenToken = m.contract("SingleSwapToken");
  const swapMultiHop = m.contract("SwapMultiHop");

  return { booToken, lifeToken, singleSwapTokenToken, swapMultiHop };
});
