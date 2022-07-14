// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Infura1155NFT is ERC1155, Ownable {
    uint256 public constant GOLD = 0;
    uint256 public constant RARE_ITEM = 1;
    uint256 public constant EPIC_ITEM = 2;

    constructor() ERC1155("https://raw.githubusercontent.com/anataliocs/NFT-Standards/main/metadata/Infura1155NFT-type{id}.json") {}

    function mint(address recipient) public returns (uint256)
    {
        _mint(recipient, GOLD, 10, "");
        _mint(recipient, RARE_ITEM, 1, "");
        _mint(recipient, EPIC_ITEM, 1, "");

        return 0;
    }

}