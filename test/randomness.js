const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Attack", () => {
  it("Should be able to guess the exact number", async () => {
    const gameContract = await ethers.deployContract("Game", {
      value: ethers.parseEther("0.1"),
    });
    await gameContract.waitForDeployment();

    const attackContract = await ethers.deployContract("Attack", [
      gameContract.target,
    ]);
    await attackContract.waitForDeployment();

    const txn = await attackContract.attack();
    await txn.wait();

    expect(await ethers.provider.getBalance(attackContract.target)).to.equal(
      ethers.parseEther("0.1")
    );

    expect(await ethers.provider.getBalance(gameContract.target)).to.equal(
      ethers.toBigInt("0")
    );
  });
});
