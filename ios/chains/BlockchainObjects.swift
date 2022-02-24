//
//  BlockchainObjects.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-21.
//

import Foundation


struct AvailableToken  {
    var token_id: String
    var name: String
    var logoUrl: String?
    var network: BlockchainToken
}

struct BlockchainToken: Equatable {
    var network_id: BlockchainTokenNetworks
    var address: TokenAddress
}
