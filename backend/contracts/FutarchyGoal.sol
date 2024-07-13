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
  bool public demo;

  modifier timeStillRunning(uint _time) {
    require((block.timestamp > startTime + _time) || demo, "Time is not over");
    _;
  }

  event ProposalAdded(uint _proposalId, address _proposalAddr);

  constructor(string memory _description, address _owner, uint _goalMaturity, uint _goalValue, uint _votingDeadline, bool _demo) Ownable(_owner) {
    description = _description;
    oracle = address(new FutarchyOracle());
    goalMaturity = _goalMaturity;
    goalValue = _goalValue;
    votingDeadline = _votingDeadline;
    demo = _demo;
  }

  function createProposal(string calldata _description) public onlyOwner {
    address proposal = address(new FutarchyProposal(address(this), _description));
    proposals.push(proposal);
    uint proposalId = proposals.length - 1;
    if (proposalId == 0) {
      currentProposal = proposalId;
      startTime = block.timestamp;
      FutarchyProposal(proposal).startVoting();
    }
    emit ProposalAdded(proposalId, proposal);
  }

  function nbProposals() external view returns (uint256) {
    return proposals.length;
  }

  function getProposal(uint _proposalId) external view returns (address) {
    return proposals[_proposalId];
  }

  // Should be called by owner to end a vote.
  function endProposalVoting() external onlyOwner timeStillRunning(votingDeadline) {
    bool isAccepted = FutarchyProposal(proposals[currentProposal]).endVoting();
    if (!isAccepted) {
      if (proposals.length > currentProposal) {
        currentProposal++;
        startTime = block.timestamp;
        FutarchyProposal(proposals[currentProposal]).startVoting();
      }
    }
  }

  function goalAchieved() external timeStillRunning(goalMaturity) {
    bool result = FutarchyOracle(oracle).getResult() >= goalValue;
    FutarchyProposal(proposals[currentProposal]).tallyGoal(result);
  }
}
