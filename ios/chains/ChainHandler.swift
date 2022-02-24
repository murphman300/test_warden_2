//
//  ChainHandler.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-22.
//

import Foundation


final class ChainHandler {
  
  static func returnNetworkManager(fromNetworkId: String) throws -> BlockchainManager {
    guard let network = BlockchainTokenNetworkIds(network: fromNetworkId) else {
      throw "ChainHandler.returnNetworkManager(fromNetworkId: String) Error - BlockchainTokenNetworkIds has no case for \(fromNetworkId)" as! Error
    }
    switch network {
      case .ethereum:
      return ERCManager.node
    default:
      throw "ChainHandler.returnNetworkManager(fromNetworkId: String) Error - BlockchainTokenNetworkIds.\(network.rawValue) has network manager" as! Error
    }
  }
  
}
