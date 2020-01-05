pragma solidity 0.5.0;

contract FilesHandler {
	string fileHash;

	struct Meme {
		string ipfsHash;
		uint votes;
	}

	mapping (address => Meme) private memes;

	function setFileHash(string memory _fileHash) public {
		fileHash = _fileHash;
	}

	function getFileHash() public view returns(string memory) {
		return fileHash;
	}

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

	function getMeme() public view returns(string memory ipfsHash, uint votes) {
		address creator = msg.sender;
	  return (memes[creator].ipfsHash, memes[creator].votes);
	}

	function addSelfVote() public {
	  address creator = msg.sender;
		memes[creator].votes++;
	}

	function getVotes() public view returns(uint votes) {
		address creator = msg.sender;
		return (memes[creator].votes);
	}

}
