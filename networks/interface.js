import Web3 from 'web3';

export class Web3Interface {
  _node: Web3;

  constructor() {}

  async createAccount() {
    return this._node.eth.accounts.create();
  }
}

module.exports = {
  Web3Interface,
  Web3,
};
