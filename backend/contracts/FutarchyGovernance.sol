// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyGoal} from "./FutarchyGoal.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract FutarchyGovernance is Ownable {
  address[] goals;

  event GoalAdded(uint _goalId, address _addr);

  constructor() Ownable(msg.sender) {}

  function createGoal(string calldata _description) public onlyOwner {
    address addr = address(new FutarchyGoal(_description, msg.sender));
    goals.push(addr);
    uint goalId = goals.length - 1;
    emit GoalAdded(goalId, addr);
  }

  function nbGoals() external view returns (uint256) {
    return goals.length;
  }

  function getGoal(uint _goalId) external view returns (address) {
    return goals[_goalId];
  }
}
