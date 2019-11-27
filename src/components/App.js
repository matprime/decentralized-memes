import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import FilesHandler from '../abis/FilesHandler.json'

const ipfsClient = require('ipfs-http-client')
// connect to public ipfs daemon API server
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {

  //React life-cycle event, we gonna use it to connect app to blockchain
  //https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1
  async componentWillMount() {
    await this.loadWeb3()
    await this.initializeFile()
  }

  // Get the account
  // Get the network
  // Get Smart contract
  // Get File Hash

  //get file hash from blockchain to show file when app starts
  async initializeFile() {
    const web3 = window.web3
    //https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#getaccounts
    const accounts = await web3.eth.getAccounts()
    console.log('Using account in Metamask: ' + accounts)
    this.setState({ account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    console.log('Metamask is connected to: ' + networkId)
    const networkData = FilesHandler.networks[networkId]
    if (networkData) {
      //fetching the contract
      const abi = FilesHandler.abi
      const address = networkData.address      
      const contract = web3.eth.Contract(abi, address)
      this.setState({contract})
      console.log(contract)
      //calling get function from smart contract
      const fileHash = await contract.methods.get().call()
      this.setState({fileHash})
    } else {
      window.alert('Smart contract was not deployed to connected network!');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '', 
      buffer : null,
      contract: null,
      fileHash: 'QmNP2xz4PkPXZwaUyzC9tyDdTjEpET1D3vW1CdwNQdyTdM' 
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } if (window.web3) {      
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('To work correctly, please use metamask!')
    }
  }

  captureFile = (event) => {
    event.preventDefault()
    console.log('meme uploaded...')
    // file processing for store to IPFS
    const file = event.target.files[0]
    const fileReader = new window.FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onloadend = () => {
      this.setState({buffer: Buffer(fileReader.result)})      
    }    
  }

  onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting the form...")
    //IPFS: http://ipfs.infura.io/ipfs/QmWERhDH1PLhYAeRLQQ8Cc9ykmi8XUvsBeEXgZcwQ3fAuL
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      const fileHash = result[0].hash
      this.setState({fileHash})
      if(error) {
        console.error(error)
        return
      }
      //storing file hash on blockchain      
      this.state.contract.methods.set(fileHash).send({ from: this.state.account }).then((r) => {
        this.setState({fileHash})
      })
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prime Memes
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.fileHash}`}/>
                </a>
                <p>&nbsp;</p>
                <h2>Upload Meme</h2>
                <form onSubmit={this.onSubmit}>
                <input type='file' onChange={this.captureFile} />
                <input type='submit' />
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
