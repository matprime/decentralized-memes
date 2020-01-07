pragma solidity 0.5.0;

contract MemesHandler {

  struct EntityStruct {
    uint entityData;
    bool isEntity;
  }

  mapping(address => EntityStruct) public entityStructs;
  address[] public entityList;

  function isEntity(address entityAddress) public view returns(bool isIndeed) {
      return entityStructs[entityAddress].isEntity;
  }

  function getEntityCount() public view returns(uint entityCount) {
    return entityList.length;
  }

  function newEntity(address entityAddress, uint entityData) public returns(uint rowNumber) {
    if(isEntity(entityAddress)) revert();
    entityStructs[entityAddress].entityData = entityData;
    entityStructs[entityAddress].isEntity = true;
    return entityList.push(entityAddress) - 1;
  }

  function updateEntity(address entityAddress, uint entityData) public returns(bool success) {
    if(!isEntity(entityAddress)) revert();
    entityStructs[entityAddress].entityData    = entityData;
    return true;
  }
}
