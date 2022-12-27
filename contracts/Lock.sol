// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "../node_modules/hardhat/console.sol";
import "./ownable.sol";
import "./safemath.sol";

contract Lock is Ownable {
    uint public unlockTime;
    address payable public lockOwner;
    string private greeting;

    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event Withdrawal(uint amount, uint when);

    constructor() payable {
        lockOwner = payable(msg.sender);
        greeting = "init";
    }

    // Payable constructor can receive Ether
    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        console.log(
            "Unlock time is %o and block timestamp is %o",
            unlockTime,
            block.timestamp
        );

        //require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(isOwner(), "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        lockOwner.transfer(address(this).balance);
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
