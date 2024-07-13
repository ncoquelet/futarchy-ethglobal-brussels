// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyProposal} from "./FutarchyProposal.sol";
import {FutarchyOracle} from "./FutarchyOracle.sol";

contract FutarchyGoal {
  address[] proposals;
  address oracle;

  event ProposalAdded(uint _proposalId, address _proposalAddr, address _oracleAddress);

  constructor(string memory _description) {}

  function createProposal(string calldata _description) public {
    address proposal = address(new FutarchyProposal(_description));
    proposals.push(proposal);
    uint proposalId = proposals.length - 1;

    oracle = address(new FutarchyOracle());

    emit ProposalAdded(proposalId, proposal, oracle);
  }

  function nbProposals() external view returns (uint256) {
    return proposals.length;
  }

  function getProposal(uint _goalId) external view returns (address) {
    return proposals[_goalId];
  }

  function getGoalOracle() external view returns (address) {
    return oracle;
  }
}
