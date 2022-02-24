//
//  Wallets.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-15.
//

import Foundation
import CoreData
import PromiseKit
@testable import web3swift

@objc(AddressManager)
class AddressManager: NSObject, RCTBridgeModule {
  
//  typealias Handler = (Result<Wallet>) -> Void
  
  static func moduleName() -> String! {
    return "AddressManager"
  }
  
  @objc static func requiresMainQueueSetup() -> Bool {
      return false
  }
  
  @objc static let _int = AddressManager()
  
  private let cache = Cache<String, Address>()
  
  public var cacheSize: Int {
    get {
      return cache.count
    }
  }
  
  func loadWallet(withID id: String) -> Promise<Address> {
    
    return Promise{ seal in
      if let cached = cache[id] {
        return seal.fulfill(cached)
      }
      return seal.reject(CDError.cachedValueNotPresent)
    }
    
  }
  
  func _getAddressWithPromise(_ walletId: String) -> Promise<Address> {
    return Promise{ seal in
      
      guard let w = cache[walletId] else { return seal.reject(CDError.cachedValueNotPresent) }
      
      return seal.fulfill(w)
      
    }
  }
  
  public func createAddressEntry(for account: Account, network: String, name: String, password: String, mnemonic: String? = "nil") throws -> Address {
      
      let manager: BlockchainManager = try ChainHandler.returnNetworkManager(fromNetworkId: network)
      
      
      
      // MARK: - Get Seed of the account here
//      account.seed
      let seed = mnemonic
      
      let addressResponse: CreateAddressResponse = try manager.createAddress(password: password, name: name, mnemonic: seed)
    
      return Address.saveWith(name: name, network: network, createResponse: addressResponse, account: account)
    
  }
  
  
//  func _createAddressEntry(for account: Account, network: String) -> Promise<Address> {
//    return Promise{ seal in
//
////      w.index = String(AddressManager._int.cacheSize + 1)
//
//      // MARK: - Create Seed Value or use default seed for account
//
//      let seedValue = ""
//
//      // CREATE WALLET ON CHAIN HERE....
//
//      let r = self.createAddressEntry(for: account, network: network, name: <#T##String#>, password: <#T##String#>)
//
//
//      manager.createAddress(password: <#T##String#>, name: <#T##String#>, mnemonic: <#T##String?#>)
//        .done { r in
//
//          addressResponse = r.
//
//          try w.saveToDisk()
//
//          self._loadAddressesFromDisk()
//            .done { _ in
//              self.getAll()
//                .done { r in
//                    return seal.fulfill(w)
//                }
//                .catch { e in
//                    return seal.reject(e)
//                }
//            }
//            .catch { e in
//              return seal.reject(e)
//            }
//        }
//        .catch { e in
//          return seal.reject(e)
//        }
//    }
//  }
  
  func _loadAddressesFromDisk() -> Promise<Void> {
    return Promise{ seal in
        do {
          let fetch = Address.fetchRequest()
          
          let wallets = try CoreDataManager.node.managedObjectContext.fetch(fetch)
          
          for wallet in wallets {
            guard let id = wallet.id else { continue }
            cache[id] = wallet
          }
          
          return seal.fulfill(Void())
        } catch let error {
          return seal.reject(error)
        }
    }
  }
  
  func readAllSeeds() -> Void {
    do {
      let f = Seeds.fetchRequest();
      let result = try CoreDataManager.node.managedObjectContext.fetch(f)
      print(result, "are the seeds")
    } catch let err {
      print(err.localizedDescription)
    }
  }
  
  func getAll() -> Promise<[Address]> {
    return Promise{ seal in
      self.cache.listAsync()
        .done { r in
            let sorted = r.sorted(by: { a, b in
              guard let e = Float(a.index ?? "0") else {
                return false
              }
              guard let f = Float(a.index ?? "0") else {
                return false
              }
              return e < f
            })
//              self.readAllSeeds()
            return seal.fulfill(sorted)
        }
        .catch { e in
            return seal.reject(e)
        }
    }
    
  }
  
  
}



// MARK: - Seeding


// TODO: - ADD THE ACCOUNT SIDE AND MNEMONIC SIDE ACTIONS THAT PRECEDE THE FLOW BELLOW....

extension AddressManager {

  func seedAllAvailableAddresses(for account: Account, mnemonic: String, password: String? = "") throws {
    
    for address in availableBlockChainTokens {
      do {
        let addressObject = try self.createAddressEntry(for: account, network: address.network.network_id.rawValue, name: address.name, password: password ?? "", mnemonic: mnemonic)
        
        account.addToAddresses(addressObject)
      } catch let error {
        throw error
      }
    }
    
    guard CoreDataManager.node.saveChanges() else {
      throw "No changes seeded for seedAllAvailableAddresses" as! Error
    }
    return
  }
  
}



// MARK: - BRIDGE METHODS


extension AddressManager {
  
  
  @objc
  func getWalletWith(_ walletId: String) -> Address? {
    return cache[walletId]
  }
  
  @objc
  func getAddressWithPromise(_ walletId: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    _getAddressWithPromise(walletId)
      .done { _ in
        resolve(nil)
      }
      .catch { err in
        reject(nil, err.localizedDescription, nil)
      }
  }
  
//  @objc
//  func createAccount(_ wallet: NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
//    _createAddressEntry(wallet)
//      .done { r in
//        resolve(r.toNsDict())
//      }
//      .catch { err in
//        reject(nil, err.localizedDescription, nil)
//      }
//  }
  
  
  @objc
  func loadAddresses(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    AddressManager._int._loadAddressesFromDisk()
      .done { _ in
        resolve(nil)
      }
      .catch { err in
        reject(nil, err.localizedDescription, nil)
      }
  }
  
  @objc
  func getAllAddresses(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    AddressManager._int.getAll()
      .done { r in
        let v = r.map { wallet in
          return wallet.toNsDict()
        }
        resolve(v)
      }
      .catch { err in
        reject(nil, err.localizedDescription, nil)
      }
  }
}
