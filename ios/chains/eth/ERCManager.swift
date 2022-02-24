//
//  File.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-21.
//

import Foundation
import web3swift
import PromiseKit



class ERCManager: BlockchainManager {
    
    static let node = ERCManager()
    
    private var _web3: web3
    
    init() {
        self._web3 = Web3.InfuraRopstenWeb3()
    }
    
  func createAddressWithMnemonic(password: String, name: String, mnemonic: String?) throws -> CreateAddressResponse {
      let bitsOfEntropy: Int = 128 // Entropy is a measure of password strength. Usually used 128 or 256 bits.
      var mnemonics: String = mnemonic ?? ""
      if mnemonic == nil {
          mnemonics = try! BIP39.generateMnemonics(bitsOfEntropy: bitsOfEntropy)!
      }
      let keystore = try! BIP32Keystore(
          mnemonics: mnemonics,
          password: password,
          mnemonicsPassword: "",
          language: .english)!
      let keyData = try! JSONEncoder().encode(keystore.keystoreParams)
      let address = keystore.addresses!.first!.address
      let wallet = ERCWallet(value: address, data: keyData, name: name, isHD: true)
      
      let data = wallet.data
      let keystoreManager: KeystoreManager
      if wallet.isHD {
          let keystore = BIP32Keystore(data)!
          keystoreManager = KeystoreManager([keystore])
      } else {
          let keystore = EthereumKeystoreV3(data)!
          keystoreManager = KeystoreManager([keystore])
      }
      
      let ethereumAddress = EthereumAddress(wallet.value)!
      
    // This is the decrypted private key in data type
    let pkData = try! keystoreManager.UNSAFE_getPrivateKeyData(password: password, account: ethereumAddress).toHexString()
      
    let resp = CreateAddressResponse(address: address, hdKey: nil, mnemonic: mnemonics, privateKey: pkData)
      
    return resp
  }
    
    private func createAddressWithMnemonic(password: String, name: String, mnemonic: String?) -> Promise<CreateAddressResponse> {
        return Promise {seal in
          do {
            let response = try self.createAddressWithMnemonic(password: password, name: name, mnemonic: mnemonic)
            
            return seal.fulfill(response)
          } catch let error {
            return seal.reject(error)
          }
        }
    }
  
  
  private func createAddressWithPrivateKey(password: String, name: String) throws -> CreateAddressResponse {
    
      do {
          let keystore = try! EthereumKeystoreV3(password: password)!
          let keyData = try! JSONEncoder().encode(keystore.keystoreParams)
          let address = keystore.addresses!.first!.address
          let wallet = ERCWallet(value: address, data: keyData, name: name, isHD: false)
          print(wallet)
        return CreateAddressResponse(address: address, hdKey: nil, mnemonic: nil, privateKey: nil)
      } catch let error {
        throw error
      }
  }
    
      
      private func createAddressWithPrivateKey(password: String, name: String) -> Promise<CreateAddressResponse> {
          return Promise {seal in
            do {
                let keystore = try! EthereumKeystoreV3(password: password)!
                let keyData = try! JSONEncoder().encode(keystore.keystoreParams)
                let address = keystore.addresses!.first!.address
                let wallet = ERCWallet(value: address, data: keyData, name: name, isHD: false)
                print(wallet)
              seal.fulfill(CreateAddressResponse(address: address, hdKey: nil, mnemonic: nil, privateKey: nil))
            } catch let error {
              return seal.reject(error)
            }
          }
      }
  

    func createAddress(password: String, name: String, mnemonic: String?) throws -> CreateAddressResponse {
      return try self.createAddressWithMnemonic(password: password, name: name, mnemonic: mnemonic)
    }

    func createAddress(password: String, name: String, mnemonic: String?) -> Promise<CreateAddressResponse> {
      return Promise {seal in
        self.createAddressWithMnemonic(password: password, name: name, mnemonic: nil)
            .done { r in seal.fulfill(r) }
            .catch{ err in seal.reject(err) }
      }
    }
    
    func createAddress(dict: Dictionary<String, Any>) -> Promise<CreateAddressResponse> {
      return Promise {seal in
          
          guard let name = dict["name"] as? String else { return seal.reject("createAddress(dict:) Error - no wallet name specified" as! Error) }
          
          guard let password = dict["password"] as? String else { return seal.reject("createAddress(dict:) Error - no wallet password specified" as! Error) }
          
          self.createAddressWithMnemonic(password: password, name: name, mnemonic: dict["mnemonic"] as? String)
              .done { r in seal.fulfill(r) }
              .catch{ err in seal.reject(err) }
          
      }
    }
    
    func createAddress(nsDict: NSDictionary) -> Promise<CreateAddressResponse> {
      return Promise {seal in
          
          guard let dict = nsDict as? Dictionary<String, Any> else { return seal.reject("createAddress(nsDict:) Error - casting nsDict to Dictionary<String, Any>" as! Error) }
          
          self.createAddress(dict: dict)
              .done { r in seal.fulfill(r) }
              .catch{ err in  seal.reject(err) }
          
      }
    }

}
