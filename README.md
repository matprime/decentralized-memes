# Meme of the day dApp (decentralized)


Demonstration dApp is created using Ethereum blockchain and IPFS Interplanetary File System. Frontend of dApp is running in web browser window, where it possible to interact with dApp. 

You will be able to select a file/meme from your computer and upload it to IPFS. Information where on IPFS file/meme resides will be stored in Ethereum blockchain as hash from IPFS (hash of file/meme when it was generated on IPFS). Application is simulating "Meme of the day" functionality. Users of dApp will be able to upload memes and vote for memes. Application will be showing top voted memes, possiblity to upload meme and possibility to vote on memes.

**Dependencies are:**
- Node.js 10.1x.x
> download from https://nodejs.org and follow installation instructions
- Truffle
> npm install -g truffle@5.0.5 (important is to use this version)
- Web3.js
- IPFS
- Ganache
> donwnload from https://www.trufflesuite.com/ganache
> change the permission of file to be executable: chmod u+x ganache-2.1.2-linux-x86_64.AppImage
> then run it with double click from GUI or from terminal window: ./ganache-2.1.2-linux-x86_64.AppImage
- Metamask extension from Google Chrome web store

**Installation procedure**
```shell
git clone https://github.com/matprime/decentralized-memes
cd decentralized-memes
npm install
npm run start
```
Before starting the application with last command "npm run start" you need to make sure that Ganache is running. Please look into Ganache manual, how to start it (you need to change permission on file donwloaded to be executable, to be able to run it). After Ganache is running and you started application, you should see web browser open up and application will load and show the latest meme uploaded in browser window.

**Command to migrate smart contract to blockchain**
```shell
truffle migration
```
After succesfull migration of smart contract to blockhain you can interact with him using truffle console.

**Some commands you can use with truffle console**
After smart contracts deployment to blockchain with migration, you can use truffle console to interact with smart contracts using CLI. To start truffle console from command shell type:
```shell
truffle console
```
After truffle console is running you can get contract from blockchain with command:
```javascript
truffle(development)> const fileshandler = await FilesHandler.deployed()
```
You can store hash of file to blockchain using contracts set function:
```javascript
truffle(development)> result = fileshandler.setFileHash('filehash123')
```
To get the hash of file stored on blockchain you can type:
```javascript
truffle(development)> const filehash = await fileshandler.getFileHash()
```
You needed to type constant as command to get value stored in it:
```javascript
truffle(development)> filehash
'filehash123'
```

**To run tests defined in folder /test run from shell command**  
```javascript
truffle test
```
Tests will check if contracts deployment on blockchain was done correctly.  Also if get and set methods of smart contract are working corectly. After running command you will see outpot similar to:
```shell
Using network 'development'.

Compiling ./src/contracts/FilesHandler.sol...


  Contract: FilesHandler
    deployment
0xDA228234a792cb9C7C8cf9E9E0dB48A8F57C7D08
      ✓ deployed successfully!
    storage access
Saving and retrieveing from Blockhain
test123
      ✓ Hash saved and retrieved (282ms)


  2 passing (422ms)

```
