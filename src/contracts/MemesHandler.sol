pragma solidity 0.5.0;

contract MemesHandler {

  struct MemeStruct {
    uint memeHash;
    bool isMeme;
  }

  mapping(address => MemeStruct) public memeStructs;
  address[] public memesList;

  function isMeme(address memeAddress) public view returns(bool isIndeed) {
      return memeStructs[memeAddress].isMeme;
  }

  function getMemesCount() public view returns(uint memesCount) {
    return memesList.length;
  }

  function newMeme(address memeAddress, uint memeHash) public returns(uint rowNumber) {
    if(isMeme(memeAddress)) revert();
    memeStructs[memeAddress].memeHash = memeHash;
    memeStructs[memeAddress].isMeme = true;
    return memesList.push(memeAddress) - 1;
  }

  function updateEntity(address memeAddress, uint memeHash) public returns(bool success) {
    if(!isMeme(memeAddress)) revert();
    memeStructs[memeAddress].memeHash    = memeHash;
    return true;
  }
}
