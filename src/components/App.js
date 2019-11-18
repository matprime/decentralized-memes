import React, { Component } from 'react';
import logo from '../u-said-be-prepared.png';
import './App.css';

const ipfsClient = require('ipfs-http-client')
// connect to public ipfs daemon API server
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      buffer : null 
    };
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
      if(error) {
        console.error(error)
        return
      }
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
                  <img src={logo} className="App-logo" alt="logo" />
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
