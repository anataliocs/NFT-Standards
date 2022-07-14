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

    event Mint(uint256 _value, string tokenURI);

    constructor() ERC721("Infura721NFT", "INFURA721") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        emit Mint(newItemId, tokenURI);

        return newItemId;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        return "https://raw.githubusercontent.com/anataliocs/NFT-Standards/main/metadata/InfuraNFT.json";
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://raw.githubusercontent.com/anataliocs/NFT-Standards/main/metadata/InfuraNFT.json";
    }

    function contractURI() public view returns (string memory) {
        return "https://raw.githubusercontent.com/anataliocs/NFT-Standards/main/metadata/opensea-contract-721.json";
    }

    /**
        * @dev Reverts if the `tokenId` has not been minted yet.
    */
    function _requireMinted(uint256 tokenId) internal view virtual {
        require(_exists(tokenId), "ERC721: invalid token ID");
    }
}