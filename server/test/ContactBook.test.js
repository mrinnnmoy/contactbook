const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ContactBook", function () {
    //   Declare variables to store the contract factory, contract instance, and deployer's address and another wallet address.
    let ContactBook;
    let contactBook;
    let owner;
    let addr1;

    // 'beforeEach' hook is executed before each test case.
    beforeEach(async function () {
        // Get two Ethereum signers (accounts) for testing.
        [owner, addr1] = await ethers.getSigners();

        // Get the ContactBook contract factory, then deploy the ContactBook contract and ensure the contract is deployed and ready for testing.
        ContactBook = await ethers.getContractFactory("ContactBook");
        contactBook = await ContactBook.deploy();
    });

    // First test case, which checks the functionality of adding a contact.
    it("Should add a contact", async function () {
        const contactName = "Mrinmoy Porel";
        const contactWallet = addr1.address;

        // Call the 'addContact' function on the ContactBook contract, passing the contactName and contactWallet.
        await contactBook.connect(owner).addContact(contactName, contactWallet);

        // Get the list of contacts from the ContactBook contract.
        const contacts = await contactBook.getContacts();

        // Use Chai's 'expect' function to make assertions about the contract's behavior.
        // Expect there to be one contact in the list, the contact's name to match the sample name and the contact's wallet address to match addr1's address.
        expect(contacts.length).to.equal(1);
        expect(contacts[0].name).to.equal(contactName);
        expect(contacts[0].wallet).to.equal(contactWallet);
    });

    // Second test case, which checks the functionality of removing a contact.
    it("Should remove a contact", async function () {
        const contactName = "Mrinmoy Porel";
        const contactWallet = addr1.address;

        // Add a contact to the ContactBook contract, similar to the first test case.
        await contactBook.connect(owner).addContact(contactName, contactWallet);

        // Get the list of contacts before removing a contact.
        const initialContacts = await contactBook.getContacts();

        // Call the 'removeContact' function on the ContactBook contract to remove the contact at index 0.
        await contactBook.connect(owner).removeContact(0);

        // Get the list of contacts after removing the contact.
        const updatedContacts = await contactBook.getContacts();

        // Use Chai's 'expect' function to make assertions about the contract's behavior.
        // Expect the number of contacts to decrease by 1.
        expect(updatedContacts.length).to.equal(initialContacts.length - 1);
    });
});