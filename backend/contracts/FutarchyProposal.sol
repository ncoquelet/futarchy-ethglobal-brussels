// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

import {FutarchyMarket} from "./FutarchyMarket.sol";

contract FutarchyProposal {
  string description;
  address marketYes;
  address marketNo;

  constructor(string memory _description) {
    description = _description;
    marketYes = address(new FutarchyMarket());
    marketNo = address(new FutarchyMarket());
  }

  function getMarketYes() external view returns (address) {
    return marketYes;
  }

  function getMarketNo() external view returns (address) {
    return marketNo;
  }
}
