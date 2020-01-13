const MemesHandler = artifacts.require("MemesHandler");

require('chai')
	.use(require('chai-as-promised'))
	.should()

//this provides access to all Ethereum accounts in Ganache
contract('MemesHandler', (accounts) => {
	let memesHandler

	//test if contract was deployed correctly on Blockhain
	describe('deployment', async () => {
		it('deployed successfully!', async () => {
			memesHandler = await MemesHandler.deployed()
			const address = memesHandler.address
			assert.notEqual(address, 0x0);
			assert.notEqual(address, '');
			assert.notEqual(address, null);
			assert.notEqual(address, undefined);
			console.log(address);
		})
	})

	//test creation and retrieval of meme on blockchain is working
	describe('meme creation and retrieval test', async () => {
		it('Meme created and retrieved', async () => {
			let ipfsHash
			ipfsHash = 'memehash234'
			console.log('Creating meme and retrieveing it from Blockhain')
			await memesHandler.newMeme(ipfsHash)
			const result = await memesHandler.getMemeByAddress(accounts[0])
			console.log(result)
			assert.equal(result, ipfsHash)
		})
	})

	//test if counter of number of memes created on blockchain is working
	describe('meme count retrieval test', async () => {
		it('Meme count retrieved', async () => {
			console.log('Retrieving meme count from Blockhain')
			const result = await memesHandler.getMemesCount()
			console.log(result)
			assert.equal(result, 1)
		})
	})

	//test if updating of meme's ipfshash on blockchain is working
	describe('update of memes ipfshash test', async () => {
		it('Memes ipfshash updated', async () => {
			let ipfsHash
			ipfsHash = 'memehash345'
			console.log('Updating memes ipfshash and retrieveing it from Blockhain')
			await memesHandler.updateMeme(accounts[0], ipfsHash)
			const result = await memesHandler.getMemeByAddress(accounts[0])
			console.log(result)
			assert.equal(result, ipfsHash)
		})
	})

	//test if updating of meme's votes on blockchain is working
	describe('Updating meme votes test', async () => {
		it('Meme votes updated', async () => {
			console.log('Updating meme votes and retrieveing them from Blockhain')
			await memesHandler.addVote(accounts[0])
			const result = await memesHandler.getVotes(accounts[0])
			console.log(result)
			assert.equal(result, 1)
		})
	})

})
