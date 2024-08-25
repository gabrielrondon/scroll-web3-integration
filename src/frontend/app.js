let web3;
let contract;
const contractABI = [
    // Paste the ABI of the deployed contract here
];
const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            document.getElementById('walletAddress').innerText = `Connected: ${accounts[0]}`;
            contract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error('User denied wallet connection', error);
        }
    } else {
        alert('MetaMask is not installed!');
    }
}

async function registerAddress() {
    const userAddress = document.getElementById('userAddress').value;
    if (contract && userAddress) {
        const accounts = await web3.eth.getAccounts();
        try {
            const receipt = await contract.methods.registerAddress(userAddress).send({ from: accounts[0] });
            alert(`Address registered successfully: ${receipt.transactionHash}`);
        } catch (error) {
            console.error('Error registering address:', error);
        }
    } else {
        alert('Please connect your wallet and enter an address.');
    }
}

async function getAddress() {
    const retrieveAddress = document.getElementById('retrieveAddress').value;
    if (contract && retrieveAddress) {
        try {
            const address = await contract.methods.getAddress(retrieveAddress).call();
            document.getElementById('retrievedAddress').innerText = `Retrieved Address: ${address}`;
        } catch (error) {
            console.error('Error retrieving address:', error);
        }
    } else {
        alert('Please connect your wallet and enter a wallet address.');
    }
}

document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('registerButton').addEventListener('click', registerAddress);
document.getElementById('getAddressButton').addEventListener('click', getAddress);
