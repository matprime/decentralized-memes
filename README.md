# Demonstration how to store files online (decentralized)


Demonstration application will be created using Ethereum blockchain and IPFS Interplanetary File System. Frontend of application will be run in web browser window, where it will be possible to interact with application. 

You will be able to select a file from your computer and upload it to IPFS. Information where on IPFS file resides will be stored in Ethereum blockchain. Application is simulating simple "Meme of the day" functionality. Users will be able to upload memes and vote for memes. Application will be showing top voted memes, possiblity to upload meme and possibility to vote on any meme stored on IPFS.

**Dependencies are:**
- Node.js 10.1x.x
> download from nodejs.org and follow installation instructions
- Truffle
> npm install -g truffle@5.0.5 (important is to use this version)
- Web3.js
- IPFS
- Ganache
- Metamask extension from Google Chrome web store

**Installation procedure**
```shell
git clone https://github.com/matprime/decentralized-memes
cd decentralized-memes
npm install
npm run start
```
Before starting the application with last command "npm run start" you need to make sure that Ganache is running before. Please look into Ganache manual, how to start it. After Ganache is running and you started application, you should see web browser to open up and application will load in browser window.

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
truffle(development)> result = fileshandler.set('test123')
```
To get the hash of file stored on blockchain you can type:
```javascript
truffle(development)> const filehash = await fileshandler.get()
```
You needed to type constant as command to get value stored in it:
```javascript
truffle(development)> filehash
'test123'
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
