import {Web3Interface, Web3} from './interface';

class EthInterface extends Web3Interface {
  constructor() {
    super();
    this._node = new Web3(
      new Web3.providers.HttpProvider(
        'https://ropsten.infura.io/v3/fb33888969c74efea2dbf81b4abc3a16',
      ),
    );
  }
}

export default EthInterface;
