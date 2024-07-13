// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyMarket} from "./FutarchyMarket.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract FutarchyProposal is Ownable {
  string public description;
  bool public closed;
  bool public canceled;
  uint public balanceYes;
  uint public balanceNo;
  mapping(address => uint) public mappingYes;
  mapping(address => uint) public mappingNo;

  modifier stillOpen() {
    require(!closed && !canceled);
    _;
  }

  constructor(address _owner, string memory _description) Ownable(_owner) {
    description = _description;
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
  function close() external onlyOwner {
    closed = true;
  }

  // Should be called by Owner if the proposal is canceled
  function cancel() external onlyOwner {
    canceled = true;
  }

  // Returns what senders ows of its pool
  function getShare() internal returns (uint) {
    uint yesBalance = mappingYes[msg.sender];
    uint noBalance = mappingNo[msg.sender];
    require(yesBalance > 0 || noBalance > 0, "No funds");
    if (yesBalance > 0) {
      return yesBalance / balanceYes;
    }
    if (noBalance > 0) {
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
      (bool successNo, ) = payable(msg.sender).call{value: reward}("");
      require(successNo, "Claiming rewards failed");
    }
  }
}
