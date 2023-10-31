const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
    const ContactBook = await hre.ethers.getContractFactory("ContactBook");
    const contactbook = await ContactBook.deploy();

    await contactbook.deployed();

    console.log(`Contract deployed at: ${contactbook.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});