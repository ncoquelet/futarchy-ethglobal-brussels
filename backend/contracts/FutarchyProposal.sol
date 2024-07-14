// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyMarket} from "./FutarchyMarket.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract FutarchyProposal is Ownable {
  enum ProposalStatus {
    Waiting,
    VoteStarted,
    VoteCancelled,
    VoteAccepted,
    VoteClosed
  }

  struct Proposal {
    address addr;
    ProposalStatus status;
    uint balanceYes;
    uint balanceNo;
    bool goalAchieved;
  }

  string public description;
  ProposalStatus status;
  bool public goalAchieved;
  uint public balanceYes;
  uint public balanceNo;
  mapping(address => uint) public mappingYes;
  mapping(address => uint) public mappingNo;

  event ProposalStarted();
  event ProposalCanceled();
  event ProposalAccepted();
  event ProposalClosed(bool goalAchieved);

  modifier stillOpen() {
    require(status == ProposalStatus.VoteStarted);
    _;
  }

  constructor(address _owner, string memory _description) Ownable(_owner) {
    description = _description;
    status = ProposalStatus.Waiting;
  }

  function getProposal() public view returns (Proposal memory) {
    Proposal memory proposal;
    proposal.addr = address(this);
    proposal.status = status;
    proposal.balanceYes = balanceYes;
    proposal.balanceNo = balanceNo;
    proposal.goalAchieved = goalAchieved;
    return proposal;
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
  function tallyGoal(bool _goalAchieved) external onlyOwner {
    status = ProposalStatus.VoteClosed;
    goalAchieved = _goalAchieved;
    emit ProposalClosed(goalAchieved);
  }

  function startVoting() external onlyOwner {
    status = ProposalStatus.VoteStarted;
  }

  // Should be called by Goal if the proposal is ended
  function endVoting() external onlyOwner returns (bool) {
    if (balanceNo >= balanceYes) {
      status = ProposalStatus.VoteCancelled;
      emit ProposalCanceled();
      return false;
    } else {
      status = ProposalStatus.VoteAccepted;
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
    if (status == ProposalStatus.VoteCancelled) {
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
    } else if (status == ProposalStatus.VoteClosed) {
      uint reward = getShare() * (balanceYes + balanceNo);
      mappingYes[msg.sender] = 0;
      mappingNo[msg.sender] = 0;
      (bool successNo, ) = payable(msg.sender).call{value: reward}("");
      require(successNo, "Claiming rewards failed");
    }
  }
}
