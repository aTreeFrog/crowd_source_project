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

    enum ProjectState {
        INIT,
        ACTIVE,
        VOTING,
        CLOSED
    }

    constructor() payable {
        lockOwner = payable(msg.sender);
        greeting = "init";
    }

    // object for each user who participates in a project
    struct projectUser {
        address projectContributer;
        uint16 ethAmount;
    }

    // object for every project that gets created
    struct projectInfo {
        string projectName;
        ProjectState projectState; // type enum
        address projectOwner;
        projectUser[] CrowdData;
    }

    mapping(uint256 => projectInfo) projects;
    uint256[] public projectIds;

    function createProject(string memory prjName, uint256 prjId) public {
        projectInfo storage newProject = projects[prjId];
        newProject.projectName = prjName;
        newProject.projectState = ProjectState.INIT;
        newProject.projectOwner = msg.sender; // person who does call is owner.

        projectIds.push(prjId); // push id into new array. Not sure how to use yet.
    }

    function obtainProjectDetails(
        uint256 prjId
    ) public view returns (projectInfo memory) {
        projectInfo storage grabProject = projects[prjId];
        return grabProject;
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
