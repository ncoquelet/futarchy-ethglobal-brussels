// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.26;

contract FutarchyOracle {
  uint result;

  event OracleResultUpdated(address oracle, uint result);

  constructor() {}

  function updateResult(uint _result) external {
    result = _result;
    emit OracleResultUpdated(address(this), result);
  }

  function getResult() external view returns (uint) {
    return result;
  }
}
