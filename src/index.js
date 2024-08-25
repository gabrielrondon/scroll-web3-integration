const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.SCROLL_TESTNET_RPC_URL));

// ABI and Contract Address
const contractABI = [
    // Paste the ABI of the deployed contract here
];
const contractAddress = 'ZOLLNER_CONTRACT';

// Initialize the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function registerAddress(userAddress) {
    const accounts = await web3.eth.getAccounts();
    const receipt = await contract.methods.registerAddress(userAddress).send({ from: accounts[0] });
    console.log('Address registered successfully:', receipt.transactionHash);
}

async function getAddress(user) {
    const address = await contract.methods.getAddress(user).call();
    console.log('Retrieved address:', address);
}

// Example usage:
(async () => {
    await registerAddress('1234 Main St, Lisbon, Portugal');
    const address = await getAddress('YOUR_WALLET_ADDRESS');  // Replace with your wallet address
    console.log('Address:', address);
})();
