// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyMarket} from "./FutarchyMarket.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract FutarchyProposal is Ownable {
  string public description;
  bool public closed;
  uint public balanceYes;
  uint public balanceNo;
  mapping(address => uint) mappingYes;
  mapping(address => uint) mappingNo;

  constructor(address _owner, string memory _description) Ownable(_owner) {
    description = _description;
  }

  function getBalanceYes() external view returns (uint) {
    return balanceYes;
  }

  function getBalanceNo() external view returns (uint) {
    return balanceNo;
  }

  function buyYes() external payable {
    require(!closed);
    mappingYes[msg.sender] += msg.value;
    balanceYes += msg.value;
  }

  function buyNo() external payable {
    require(!closed);
    mappingNo[msg.sender] += msg.value;
    balanceNo += msg.value;
  }

  function close() external {
    closed = true;
  }

  function withdraw() external payable {
    if (closed) {
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
  }
}
