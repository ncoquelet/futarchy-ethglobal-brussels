// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyProposal} from "./FutarchyProposal.sol";
import {FutarchyOracle} from "./FutarchyOracle.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract FutarchyGoal is Ownable {
  address[] public proposals;
  address public oracle;
  uint public currentProposal;
  string public description;
  uint public startTime;
  uint public goalMaturity;
  uint public goalValue;
  uint public votingDeadline;


  event ProposalAdded(uint _proposalId, address _proposalAddr);

  constructor(string memory _description, address _owner, uint _goalMaturity, uint _goalValue, uint _votingDeadline) Ownable(_owner) {
    description = _description;
    oracle = address(new FutarchyOracle());
    goalMaturity = _goalMaturity;
    goalValue = _goalValue;
    votingDeadline = _votingDeadline;
  }

  function createProposal(string calldata _description) public onlyOwner {
    address proposal = address(new FutarchyProposal(address(this), _description, oracle));
    proposals.push(proposal);
    uint proposalId = proposals.length - 1;
    if (proposalId == 0) {
      currentProposal = proposalId;
      startTime = block.timestamp;
    }
    emit ProposalAdded(proposalId, proposal);
  }

  function nbProposals() external view returns (uint256) {
    return proposals.length;
  }

  function getProposal(uint _proposalId) external view returns (address) {
    return proposals[_proposalId];
  }

  // Should be called by owner to cancel a proposal that was not voted.
  function cancelCurrentProposal() external onlyOwner() {
    require(block.timestamp > startTime + votingDeadline, 'Time for voting proposal is not over');
    FutarchyProposal(proposals[currentProposal]).cancel();
    if (proposals.length > currentProposal) {
      currentProposal++;
      startTime = block.timestamp;
    }
  } 

  function goalAchieved() external {
    require(block.timestamp > startTime + goalMaturity, 'Time for achieving goal is not over yet');
    bool result = FutarchyOracle(oracle).getResult() >= goalValue;
    FutarchyProposal(proposals[currentProposal]).tallyGoal(result);
  }
}
