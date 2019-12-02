# Demonstration how to store files online (decentralized)


Demonstration will be done using Ethereum blockchain and IPFS

**Dependencies are:**
- Node.js 10.1x.x
> dowload from nodejs.org and follow installation instructions
- Truffle
> npm install -g truffle@5.0.5
- Web3.js
- IPFS
- Ganache
- Metamask

**Some commands you can use in truffle console**
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
