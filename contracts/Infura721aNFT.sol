//Contract based on [https://docs.openzeppelin.com/contracts/4.x/erc721](https://docs.openzeppelin.com/contracts/4.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";

contract Infura721aNFT is ERC721A, Ownable {

    event Mint(uint256 _value, string tokenURI);

    constructor() ERC721A("Infura721aNFT", "INFURA721a") {}

    function mint(address recipient, uint256 quantity) public returns (uint256) {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        _safeMint(recipient, quantity);

        return 0;
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

    /**
        * @dev Reverts if the `tokenId` has not been minted yet.
    */
    function _requireMinted(uint256 tokenId) internal view virtual {
        require(_exists(tokenId), "ERC721: invalid token ID");
    }
}