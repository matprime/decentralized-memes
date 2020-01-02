pragma solidity 0.5.0;

contract FilesHandler {
	string fileHash;

	struct Meme {
		string ipfsHash;
		uint votes;
	}

	mapping (address => Meme) private memes;

  function createMeme(string memory _ipfsHash) public {
		address creator = msg.sender;
		Meme memory newMeme;
		newMeme.ipfsHash = _ipfsHash;
		newMeme.votes = 0;
		memes[creator] = newMeme;
	}

	function getMemeHash() public view returns(string memory ipfsHash) {
		address creator = msg.sender;
		return (memes[creator].ipfsHash);
	}

	function setFileHash(string memory _fileHash) public {
		fileHash = _fileHash;
	}

	function getFileHash() public view returns(string memory) {
		return fileHash;
	}
}
