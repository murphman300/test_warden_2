//
//  NetworkModule.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-10.
//

import Foundation
import PromiseKit
import web3swift

@objc(NetworkModule)
class NetworkModule: NSObject, RCTBridgeModule {
  
  static func moduleName() -> String! {
    return "NetworkModule"
  }
  
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  
  @objc func availableNetworks(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
//    print(availableBlockchainNetworksAsDicts)
    return resolve(availableBlockchainNetworksAsDicts)
  }

}
