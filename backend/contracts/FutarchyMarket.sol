// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

contract FutarchyMarket {
  bool canceled;

  event MarketCancelled(address market);

  constructor() {}

  function buy() external {}

  function sell() external {}

  function withdraw() external {}

  function cancel(bool _cancel) external {
    canceled = _cancel;
    emit MarketCancelled(address(this));
  }
}
