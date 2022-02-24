//
//   Mnemonic.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-10.
//

import Foundation
import web3swift
import PromiseKit


class MnemonicSeedType {
  var seed: String
  var store: BIP32Keystore
  init(seed: String, store: BIP32Keystore) {
    self.seed = seed
    self.store = store
  }
}


@objc(MnemonicModule)
class MnemonicModule: NSObject, RCTBridgeModule {
  
  static func moduleName() -> String! {
    return "MnemonicModule"
  }
  
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  

  
  static func _generateBip32(password: String = "warden_module1") throws -> String {
    do {
      let bitsOfEntropy: Int = 128
      return try! BIP39.generateMnemonics(bitsOfEntropy: bitsOfEntropy)!
    } catch let error {
      throw error
    }
  }

  
  static func _generateBip32Async(password: String = "warden_module1") -> Promise<String> {
    return Promise {seal in
      do {
        let mnemonics = try MnemonicModule._generateBip32(password: password)
        return seal.fulfill(mnemonics)
      } catch let error {
        return seal.reject(error)
      }
    }
  }
  
  
  @objc func generateBip32(_ what: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    MnemonicModule._generateBip32Async(password: what)
      .done { v in

        return resolve(v)
      }
      .catch { err in
        return reject(nil, err.localizedDescription, nil)
      }
  }

}
