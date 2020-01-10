const FilesHandler = artifacts.require("FilesHandler");

require('chai')
	.use(require('chai-as-promised'))
	.should()

//this provides access to all Ethereum accounts in Ganache
contract('FilesHandler', (accounts) => {
	let filesHandler

	//test if contract was deployed correctly on Blockhain
	describe('deployment', async () => {
		it('deployed successfully!', async () => {
			filesHandler = await FilesHandler.deployed()
			const address = filesHandler.address
			assert.notEqual(address, 0x0);
			assert.notEqual(address, '');
			assert.notEqual(address, null);
			assert.notEqual(address, undefined);
			console.log(address);
		})
	})

	//test if simple file setter and getter are working in contract
	describe('file storage access', async () => {
		it('Hash saved and retrieved', async () => {
			let fileHash
			fileHash = 'file123'
			console.log('Saving and retrieveing from Blockhain')
			await filesHandler.setFileHash(fileHash)
			const result = await filesHandler.getFileHash()
			console.log(result)
			assert.equal(result, fileHash)
		})
	})

	//test if meme setter and getter are working in contract
	describe('meme storage access', async () => {
		it('Meme hash saved and retrieved', async () => {
			let memeHash
			memeHash = 'meme123'
			console.log('Saving and retrieveing from Blockhain')
			await filesHandler.createMeme(memeHash)
			const result = await filesHandler.getMemeHash()
			console.log(result)
			assert.equal(result, memeHash)
		})
	})

	//test if meme self voting for is working
	describe('meme self voting', async () => {
		it('Meme owner/self voting successfull', async () => {
			console.log('Self voting of meme')
			await filesHandler.addSelfVote()
			const result = await filesHandler.getVotes()
			console.log(result)
			assert.equal(result, 1)
		})
	})

})
