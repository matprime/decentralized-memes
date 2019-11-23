import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

const ipfsClient = require('ipfs-http-client')
// connect to public ipfs daemon API server
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {

  //React life-cycle event, we gonna use it to connect app to blockchain
  //https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1
  async componentWillMount() {
    await this.loadWeb3()
  }

  constructor(props) {
    super(props);
    this.state = { 
      buffer : null,
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
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      const fileHash = result[0].hash
      this.setState({fileHash})
      if(error) {
        console.error(error)
        return
      }
      //TO DO: next is to store file on blockchain
      //IPFS: http://ipfs.infura.io/ipfs/QmWERhDH1PLhYAeRLQQ8Cc9ykmi8XUvsBeEXgZcwQ3fAuL
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
