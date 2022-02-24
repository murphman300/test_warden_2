//
//  Eth+Structs.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-21.
//

import Foundation



struct ERC20Token {
    var name: String
    var address: String
    var decimals: String
    var symbol: String
}



enum BlockchainTokenNetworkIds: String, CaseIterable {
    typealias RawValue = String
    case ethereum = "ethereum"
  
    init?(network: String) {
      switch (network) {
        case "ethereum":
          self = .ethereum
          break;
        default:
          return nil
      }
    }
}


enum BlockchainTokenNetworks: String, CaseIterable {
    typealias RawValue = String
    case eth = "Ethereum"
  
    init?(network: String) {
      switch (network) {
        case "ethereum":
          self = .eth
          break;
        default:
          return nil
      }
    }
  
  func manager() -> BlockchainManager? {
    switch self {
      case .eth: return ERCManager.node
    }
  }
}



enum ERC20Tokens: String, CaseIterable {
  typealias RawValue = String
  case shiba_inu = "shiba_inu"
}

var availableBlockChainTokens: [AvailableToken] = [
    AvailableToken(
      token_id: "ethereum",
      name: BlockchainTokenNetworks.eth.rawValue,
      logoUrl: nil,
      network: BlockchainToken(
        network_id: .eth,
        address: .shib
      )
    ),
]

var availableBlockchainNetworks: [String] = BlockchainTokenNetworks.allCases.map{ $0.rawValue }

var availableBlockchainNetworksAsDicts: [[String: String]] = availableBlockChainTokens.map { ["key": $0.token_id, "header": $0.name] }


var availableBlockChainTokensDict = availableBlockChainTokens.reduce(into: [String: AvailableToken]()) {
    $0[$1.token_id] = $1
}
