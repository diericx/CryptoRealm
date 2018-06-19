pragma solidity ^0.4.4;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/Math/SafeMath.sol";

contract RealmBase {
    // Imports
    using SafeMath for uint256;
    // Events
    event UpdatedTile(uint tileId);
    
    // Structs
    struct Tile {
        int x;
        int y;
    }

    // -- Storage --
    // World
    Tile[] tiles;
    mapping(int => mapping(int => uint)) positionToTileId;
    mapping (uint => address) tileIdToOwner;

    // Maps
    // mapping (uint256 => address) public guyIndexToOwner;
    // mapping (address => uint256) ownershipCount;

    function RealmBase() {
        // Create base tiles
        createTile(0, 0);
        createTile(0, -1);
        createTile(0, 1);
        createTile(-1, 0);
        createTile(1, 0);
        createTile(1, -1);
        createTile(-1, 1);
    }

    function createTile(int _x, int _y) internal {
        // TODO - make sure position isn't already occupied
        //   and that it is valid (next to another tile)
        uint id = tiles.push(Tile(_x, _y)) - 1;
        positionToTileId[_x][_y] = id;
    }
    
    /** @dev function for creating a new "guy"
      * @return worked Whether or not claim went through
      */
    function ClaimTile(uint _id) public returns(bool) {
        // require(tileIdToOwner[_id] != address(0));
        // require(tileIdToOwner[_id] != msg.sender);

        tileIdToOwner[_id] = msg.sender;
        emit UpdatedTile(_id);
        // emit NewGuy(id, _name, _dna);
    }

    /** @dev Returns the amount of tiles in the world
      * @return length The length of tiles in the world.
      */
    function GetTileCount() public view returns(uint) {
        return tiles.length;
    }

    /** @dev Gets data for a specific tile in the world
      * @param _id id of the tile to get data for.
      * @return owner The address of the owner of this tile.
      * @return x The x position of this tile.
      * @return y The y position of this tile.
      */
    function GetTile(uint _id) public view returns(address, int, int) {
        return (tileIdToOwner[_id], tiles[_id].x, tiles[_id].y);
    }
 
}
  