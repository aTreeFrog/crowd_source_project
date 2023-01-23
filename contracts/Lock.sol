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

    //enums aren't good in solidity. try using integers instead
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
        string ethAmount;
    }

    // object for every project that gets created
    struct projectInfo {
        string projectName;
        ProjectState projectState; // type enum
        address projectOwner;
        projectUser[] crowdData;
    }

    mapping(string => projectInfo) projects;
    mapping(address => projectUser) users;
    uint256[] public projectIds;

    function createProject(
        string memory prjName,
        uint256 prjId
    ) public payable {
        projectInfo storage newProject = projects[prjName];
        newProject.projectName = prjName;
        newProject.projectState = ProjectState.INIT;
        newProject.projectOwner = msg.sender; // person who does call is owner.

        projectUser storage newProjectUser = users[msg.sender]; //creates mapping for easier updates

        newProjectUser.projectContributer = msg.sender;
        newProjectUser.ethAmount = "1"; //ToDo: must be from app sayin amount

        newProject.crowdData.push(newProjectUser);

        projectIds.push(prjId); // push id into new array. Not sure how to use yet.
    }

    function obtainProjectDetails(
        string memory prjName
    ) public view returns (projectInfo memory) {
        projectInfo storage grabProject = projects[prjName];
        return grabProject;
    }

    function updateContributerAmount(
        string memory prjName,
        string memory ethAdded
    ) public payable {
        projectInfo storage grabProject = projects[prjName];
        bool found = false;
        for (uint i = 0; i < grabProject.crowdData.length; i++) {
            if (grabProject.crowdData[i].projectContributer == msg.sender) {
                grabProject.crowdData[i].ethAmount = ethAdded; //need to add the existing with this. Must add string numbers together
                found = true;
                break;
            }
        }

        if (found == false) {
            projectUser memory newUser = users[msg.sender];
            newUser.projectContributer = msg.sender;
            newUser.ethAmount = ethAdded;
            grabProject.crowdData.push(newUser);
        }
    }

    // functon to accept payment from external/public accounts
    function deposit() public payable {
        require(msg.value > 0, "Cannot deposit zero or negative Ether.");
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
