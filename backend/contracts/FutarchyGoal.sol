// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyProposal} from "./FutarchyProposal.sol";
import {FutarchyOracle} from "./FutarchyOracle.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract FutarchyGoal is Ownable {
  address[] public proposals;
  address public oracle;
  string public description;
  uint public startTime;
  uint public goalMaturity;

  event ProposalAdded(uint _proposalId, address _proposalAddr);

  constructor(string memory _description, address _owner, uint _goalMaturity) Ownable(_owner) {
    description = _description;
    oracle = address(new FutarchyOracle());
    goalMaturity = _goalMaturity;
    startTime = block.timestamp;
  }

  function createProposal(string calldata _description) public onlyOwner {
    address proposal = address(new FutarchyProposal(owner(), _description));
    proposals.push(proposal);
    uint proposalId = proposals.length - 1;

    emit ProposalAdded(proposalId, proposal, oracle);
  }

  function nbProposals() external view returns (uint256) {
    return proposals.length;
  }

  function getProposal(uint _proposalId) external view returns (address) {
    return proposals[_proposalId];
  }
}
