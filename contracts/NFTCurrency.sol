
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTCurrency is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(address => mapping(uint256 => uint256)) private _denominations_owned;
    mapping(address => uint256) private _networth;
    mapping(string=>uint256) private _owner_map;


    constructor() ERC721("NFT", "nft") {}

    function IssueToken(address owner, uint256 denomination)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(owner, newItemId);
        _denominations_owned[owner][denomination]+=1;
        _networth[owner]+=denomination;
        string memory tokenURI=uint2str(denomination);
        string memory denomination_count=uint2str(_denominations_owned[owner][denomination]);
        string memory stringied_addr=toAsciiString(owner);
        _setTokenURI(newItemId, cancat(cancat(tokenURI,stringied_addr),denomination_count));
        _owner_map[cancat(cancat(tokenURI,stringied_addr),denomination_count)]=newItemId;
        
    
        return  newItemId;
    }

    function returnBalance(address owner,uint256 denomination) public view virtual  returns (uint256){
        require(owner != address(0), "ERC721: balance query for the zero address");
       return  _denominations_owned[owner][denomination];
    }
    function netWorth(address owner)  public view virtual  returns(uint256){
        return _networth[owner];
    }
    function transferFunds(address owner,address to, uint256 denomination)
        public
        returns (uint256)
    {
      string memory tokenURI=uint2str(denomination);
      string memory denomination_count=uint2str(_denominations_owned[owner][denomination]);
      string  memory stringied_addr=toAsciiString(owner);
      uint256 tokenId=_owner_map[cancat(cancat(tokenURI,stringied_addr),denomination_count)];
      _transfer(owner, to, tokenId);
      _denominations_owned[to][denomination]+=1;
      _networth[to]+=denomination;
      denomination_count=uint2str(_denominations_owned[to][denomination]);
      stringied_addr=toAsciiString(to);
      _owner_map[cancat(cancat(tokenURI,stringied_addr),denomination_count)]=tokenId;
      _setTokenURI(tokenId,cancat(cancat(tokenURI,stringied_addr),denomination_count));
      _denominations_owned[owner][denomination]-=1;
      _networth[owner]-=denomination;
      return _networth[to];
     
    }
    function returnOwnerMap(address owner, uint256 denomination)
        public
        view
        virtual
        returns (uint256){
      string memory tokenURI=uint2str(denomination);
      string memory denomination_count=uint2str(_denominations_owned[owner][denomination]);
      string  memory stringied_addr=toAsciiString(owner);
      return _owner_map[cancat(cancat(tokenURI,stringied_addr),denomination_count)];
        }
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
function toAsciiString(address x) internal view returns (string memory) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
        bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
        bytes1 hi = bytes1(uint8(b) / 16);
        bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
        s[2*i] = char(hi);
        s[2*i+1] = char(lo);            
    }
    return string(s);
}

function char(bytes1 b) internal view returns (bytes1 c) {
    if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
    else return bytes1(uint8(b) + 0x57);
}

function cancat(string memory a, string memory b) public view returns(string memory){
        return(string(abi.encodePacked(a,"/",b)));
    }
}