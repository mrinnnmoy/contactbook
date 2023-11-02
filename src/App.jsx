// Import necessary libraries and dependencies.
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// Import the getWeb3 function.
import { getWeb3 } from "./web3";

// Import your contract's ABI JSON.
import ContactBook from "../constants/ContactBook.json";

const App = () => {
  // Define state variables to manage user input and contact list.
  // Name input
  const [name, setName] = useState("");
  // Wallet Address input.
  const [walletAddress, setWalletAddress] = useState("");
  // List of contacts.
  const [contacts, setContacts] = useState([]);
  // Web3 provider.
  const [web3, setWeb3] = useState(null);
  // Contract instance.
  const [contract, setContract] = useState(null);

  // Initialize Web3 and the contract when the component mounts.
  useEffect(() => {
    async function initialize() {
      const web3Instance = getWeb3(); // Initialize Web3 provider.
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setWeb3(web3Instance);
      const contractAddress = "0x7eA70E947C0E8b8832ABCb86a35b64809183Fd30";
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, ContactBook.abi, signer);
      setContract(contractInstance);

      // Fetch the initial contacts as soon as the component mounts.
      refreshContacts();
    }
    initialize();
  }, []);

  // Function to add a new contact to the contract.
  const addContact = async () => {
    if (web3 && contract) {
      try {
        const tx = await contract.addContact(name, walletAddress);
        await tx.wait();
        window.alert("Contact added successfully.");

        // Refresh the list of contacts after adding.
        refreshContacts();

        // Clear the name and walletAddress input fields.
        setName("");
        setWalletAddress("");
      } catch (error) {
        console.error("Error adding contact: ", error);
      }
    }
  };

  // Function to remove a contact from the contract.
  const removeContact = async (index) => {
    if (web3 && contract) {
      try {
        const tx = await contract.removeContact(index);
        await tx.wait();
        window.alert("Contact removed successfully.");

        // Refresh the list of contacts after removal.
        refreshContacts();
      } catch (error) {
        console.error("Error removing contact: ", error);
      }
    }
  };

  // Function to retrieve and display the list of contacts from the contract.
  const refreshContacts = async () => {
    if (contract) {
      const allContacts = await contract.getContacts();
      setContacts(allContacts);
    }
  };

  return (
    <div className="App">
      <h1>Contact Book</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
      <div>
        <h2>Contacts</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              {contact.name} - {contact.wallet}
              <button onClick={() => removeContact(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;