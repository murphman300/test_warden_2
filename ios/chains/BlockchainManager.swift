//
//  BlockchainManager.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-22.
//

import Foundation
import PromiseKit


struct ERCWallet {
    let value: String
    let data: Data
    let name: String
    let isHD: Bool
}

struct HDKey {
    let name: String?
    let address: String
}

struct CreateAddressResponse {
    var address: String
    var hdKey: HDKey?
    var mnemonic: String?
    var privateKey: String?
  
  static func fromAccount(account: Account, address: String) -> CreateAddressResponse {
    return CreateAddressResponse(address: address, hdKey: nil, mnemonic: nil, privateKey: nil)
  }
}


protocol BlockchainManager {
  
  func createAddress(password: String, name: String, mnemonic: String?) throws -> CreateAddressResponse
  
  func createAddress(password: String, name: String, mnemonic: String?) -> Promise<CreateAddressResponse>
  
  func createAddress(dict: Dictionary<String, Any>) -> Promise<CreateAddressResponse>
  
  func createAddress(nsDict: NSDictionary) -> Promise<CreateAddressResponse>
  
}
