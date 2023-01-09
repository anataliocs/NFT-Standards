//Contract based on [https://docs.openzeppelin.com/contracts/4.x/erc721](https://docs.openzeppelin.com/contracts/4.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Infura721NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Infura721NFT", "INFURA721") {}

    function mintNFT(address recipient)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);

        return newItemId;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public pure override returns (string memory) {
        return "https://raw.githubusercontent.com/anataliocs/NFT-Standards/main/metadata/InfuraNFT.json";
    }

    function contractURI() public pure returns (string memory) {
        return "https://raw.githubusercontent.com/anataliocs/NFT-Standards/main/metadata/opensea-contract-721.json";
    }
}