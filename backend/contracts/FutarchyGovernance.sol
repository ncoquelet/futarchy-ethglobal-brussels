// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyGoal} from "./FutarchyGoal.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract FutarchyGovernance is Ownable {
  address[] public goals;

  event GoalAdded(uint _goalId, address _addr);

  constructor() Ownable(msg.sender) {}

  function createGoal(string calldata _cid, string calldata _proposalCid, uint _goalMaturity, uint _goalValue, uint _votingDeadline, bool _demo) public onlyOwner() {
    address addr = address(new FutarchyGoal(_cid, _proposalCid, msg.sender, _goalMaturity, _goalValue, _votingDeadline, _demo));
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
