// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyProposal} from "./FutarchyProposal.sol";
import {FutarchyOracle} from "./FutarchyOracle.sol";

import "@openzeppelin/contracts/access/Ownable.sol";


contract FutarchyGoal is Ownable {
  address[] proposals;
  address oracle;
  string description;

  event ProposalAdded(uint _proposalId, address _proposalAddr, address _oracleAddress);

  constructor(string memory _description, address _owner) Ownable(_owner) {
    description = _description;
    oracle = address(new FutarchyOracle());
  }

  function createProposal(string calldata _description) public onlyOwner() {
    address proposal = address(new FutarchyProposal(_description));
    proposals.push(proposal);
    uint proposalId = proposals.length - 1;

    emit ProposalAdded(proposalId, proposal);
  }

  function nbProposals() external view returns (uint256) {
    return proposals.length;
  }

  function getProposal(uint _proposalId) external view returns (address) {
    return proposals[_proposalId];
  }

  function getGoalOracle() external view returns (address) {
    return oracle;
  }

}
