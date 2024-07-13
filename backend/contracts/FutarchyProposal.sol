// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyMarket} from "./FutarchyMarket.sol";
import {FutarchyOracle} from "./FutarchyOracle.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract FutarchyProposal is Ownable {
  string public description;
  address public oracle;
  bool public closed;
  bool public canceled;
  bool public accepted;
  bool public goalAchieved;
  uint public balanceYes;
  uint public balanceNo;
  mapping(address => uint) public mappingYes;
  mapping(address => uint) public mappingNo;

  event ProposalClosed(bool goalAchieved);
  event ProposalCanceled();
  event ProposalAccepted();

  modifier stillOpen() {
    require(!(canceled || accepted || closed));
    _;
  }

  constructor(address _owner, string memory _description, address _oracle) Ownable(_owner) {
    description = _description;
    oracle = _oracle;
    canceled = false;
    accepted = false;

  }

  function buyYes() external payable stillOpen {
    mappingYes[msg.sender] += msg.value;
    balanceYes += msg.value;
  }

  function buyNo() external payable stillOpen {
    mappingNo[msg.sender] += msg.value;
    balanceNo += msg.value;
  }

  // Should be called by Owner when goalMaturity is achieved
  function tallyGoal(bool _goalAchieved) external onlyOwner() {
    closed = true;
    goalAchieved = _goalAchieved;
    emit ProposalClosed(goalAchieved);
  }

  // Should be called by Goal if the proposal is ended
  function endVoting() external onlyOwner() returns (bool) {
    if (balanceNo >= balanceYes) {
      canceled = true;
      emit ProposalCanceled();
      return false;
    } else {
      accepted = true;
      emit ProposalAccepted();
      return true;
    }
  }

  // Returns what senders ows of its pool
  function getShare() internal view returns (uint) {
    if (goalAchieved) {
      uint yesBalance = mappingYes[msg.sender];
      return yesBalance / balanceYes;
    } else {
      uint noBalance = mappingNo[msg.sender];
      return noBalance / balanceNo;
    }
  }

  function withdraw() external payable {
    if (canceled) {
      uint yesBalance = mappingYes[msg.sender];
      uint noBalance = mappingNo[msg.sender];
      require(yesBalance > 0 || noBalance > 0, "No funds to withdraw");

      mappingYes[msg.sender] = 0;
      mappingNo[msg.sender] = 0;

      if (yesBalance > 0) {
        (bool successYes, ) = payable(msg.sender).call{value: yesBalance}("");
        require(successYes, "Withdrawal of 'Yes' funds failed");
      }
      if (noBalance > 0) {
        (bool successNo, ) = payable(msg.sender).call{value: noBalance}("");
        require(successNo, "Withdrawal of 'No' funds failed");
      }
    }

    if (closed) {
      uint reward = getShare() * (balanceYes + balanceNo);
      mappingYes[msg.sender] = 0;
      mappingNo[msg.sender] = 0;
      (bool successNo, ) = payable(msg.sender).call{value: reward}("");
      require(successNo, "Claiming rewards failed");
    }
  }
}
