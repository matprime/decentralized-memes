import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
//import FilesHandler from '../abis/FilesHandler.json'
import MemesHandler from '../abis/MemesHandler.json'

const ipfsClient = require('ipfs-http-client')
// connect to public ipfs daemon API server
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {

  //React life-cycle event, we gonna use it to connect app to blockchain
  //https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1
  async componentWillMount() {
    await this.loadWeb3()
    await this.initialize()

  }

  // Get the account
  // Get the network
  // Get Smart contract
  // Get memes hashes
  async initialize() {
    const web3 = window.web3
    //https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#getaccounts
    const accounts = await web3.eth.getAccounts()
    console.log('Using account in Metamask: ' + accounts)
    this.setState({ account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    console.log('Metamask is connected to: ' + networkId)
    const networkData = MemesHandler.networks[networkId]
    if (networkData) {
      //fetching the contract
      const abi = MemesHandler.abi
      const address = networkData.address
      const contract = web3.eth.Contract(abi, address)
      this.setState({contract: contract})
      console.log(contract)
      //calling get function from smart contract
      //const fileHash = await contract.methods.getFileHash().call()
      //console.log("File hash: " + fileHash)
      //this.setState({fileHash})
      const memesCount = await contract.methods.getMemesCount().call()
      console.log('count of stored memes: ' + memesCount)
      let ipfsHash ='';
      for (let i= 0; i < memesCount; i++) {
        ipfsHash = await contract.methods.getMemeByIndex(i).call()
        console.log('ipfsHash of ' + i + ' meme: ' + ipfsHash)
        //special code for writting to array of React's state object
        this.setState(state => {
          const stored = state.stored.concat(ipfsHash);

          return {
            stored,
          };
        });
        console.log('Stored memes: ' + this.state.stored)
      }
      //const memesList = await contract.methods.getMemesList().call()
      //console.log(memesList)
      //memesList.forEach(meme => console.log(meme))

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
      memeHash: 'QmNP2xz4PkPXZwaUyzC9tyDdTjEpET1D3vW1CdwNQdyTdM',
      stored: []
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

  captureMeme = (event) => {
    event.preventDefault()
    // file processing for store to IPFS
    const file = event.target.files[0]
    const fileReader = new window.FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onloadend = () => {
      this.setState({buffer: Buffer(fileReader.result)})
    }
    console.log('meme uploaded to browser cache...')
  }

  onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting the form...")
    //IPFS: http://ipfs.infura.io/ipfs/QmWERhDH1PLhYAeRLQQ8Cc9ykmi8XUvsBeEXgZcwQ3fAuL
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      const memeHash = result[0].hash
      this.setState({memeHash})
      if(error) {
        console.error(error)
        return
      }
      //storing meme with hash on blockchain
      console.log('Meme will be stored with account: ' + this.state.account);
      console.log(memeHash)
      this.state.contract.methods.newMeme(memeHash).send({ from: this.state.account }).then((r) => {
        console.log('inside of contract function call')
        this.setState({memeHash: memeHash})
      })
      //special code for writting to array of React's state object
      this.setState(state => {
        const stored = state.stored.concat(memeHash);

        return {
          stored,
        };
      });
      console.log('stored memes: ' + this.state.stored)
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
            Meme Of The Day
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
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`}/>
                </a>
                <p>&nbsp;</p>
                <h2>Select your meme and upload it</h2>
                <form onSubmit={this.onSubmit}>
                <input type='file' onChange={this.captureMeme} />
                <input type='submit' value="Upload meme"/>
                </form>
              </div>
            </main>
          </div>
        </div>

        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <h2>Browse through uploaded memes and vote on them</h2>
        <div className="container mt-5">
          <div className="row">
              <div className="col-sm">
                <a
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.stored[0]}`}/>
                </a>
              </div>

              <div className="col-sm">
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={`https://ipfs.infura.io/ipfs/${this.state.stored[1]}`}/>
                  </a>
              </div>

              <div className="col-sm">
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={`https://ipfs.infura.io/ipfs/${this.state.stored[2]}`}/>
                  </a>
              </div>

              <div className="col-sm">
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={`https://ipfs.infura.io/ipfs/${this.state.stored[3]}`}/>
                  </a>
              </div>

          </div>
        </div>

      </div>
    );
  }
}

export default App;
