// Import the ethers.js library to work with Ethereum.
import { ethers } from "ethers";

// Define global variables for Web3 provider and Ethereum provider.
let web3;
let provider;

// Define an asynchronous function to set up the Web3 provider.
async function setupWeb3() {
  if (window.ethereum) {
    // If the browser has the Ethereum object (MetaMask is available):
    web3 = new ethers.providers.Web3Provider(window.ethereum); // Initialize the Web3 provider using MetaMask.

    // Request user account access from MetaMask.
    // This will prompt the user to connect their wallet if it's not already connected.
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // After this, 'web3' will be set up and connected to the user's Ethereum wallet.
  } else {
    // If MetaMask is not detected, show an alert to the user.
    alert("MetaMask not detected! Please install MetaMask.");
  }
}

// Call the 'setupWeb3' function to set up the Web3 provider when the script is loaded.
setupWeb3();

// Export a function to retrieve the Web3 provider.
export function getWeb3() {
  return web3;
}