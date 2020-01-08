pragma solidity 0.5.0;

contract MemesHandler {

  struct MemeStruct {
    string ipfsHash;
    uint votes;
    bool isMeme;
  }

  mapping(address => MemeStruct) public memeStructs;
  address[] public memesList;

  function isMeme(address _memeAddress) public view returns(bool isIndeed) {
      return memeStructs[_memeAddress].isMeme;
  }

  function getMemesCount() public view returns(uint memesCount) {
    return memesList.length;
  }

  function newMeme(address _memeAddress, string memory _ipfsHash) public returns(uint rowNumber) {
    if(isMeme(_memeAddress)) revert();
    memeStructs[_memeAddress].ipfsHash = _ipfsHash;
    memeStructs[_memeAddress].votes = 0;
    memeStructs[_memeAddress].isMeme = true;
    return memesList.push(_memeAddress) - 1;
  }

  function updateMeme(address _memeAddress, string memory _ipfsHash) public returns(bool success) {
    if(!isMeme(_memeAddress)) revert();
    memeStructs[_memeAddress].ipfsHash = _ipfsHash;
    return true;
  }

  function getMemeHash(address _memeAddress) public view returns(string memory ipfsHash) {
    if(!isMeme(_memeAddress)) revert();
    return memeStructs[_memeAddress].ipfsHash;
  }

  function addVote(address _memeAddress) public returns(bool success) {
    if(!isMeme(_memeAddress)) revert();
    memeStructs[_memeAddress].votes++;
    return true;
  }

  function getVotes(address _memeAddress) public view returns(uint votes) {
    if(!isMeme(_memeAddress)) revert();
    return memeStructs[_memeAddress].votes;
  }
}
