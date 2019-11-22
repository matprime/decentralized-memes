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

	//test if setter and getter in contract are working
	describe('storage access', async () => {
		it('Hash saved and retrieved', async () => {
			let fileHash
			fileHash = 'test123'
			console.log('Saving and retrieveing from Blockhain')
			await filesHandler.set(fileHash)
			const result = await filesHandler.get()
			console.log(result)
			assert.equal(result, fileHash)
		})
	})
})