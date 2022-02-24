//
//  AppSetup.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-24.
//

import Foundation


enum UserAuthSetup: String, CaseIterable {
  typealias RawValue = String
  
  case faceIDNoPincode = "faceid_no_pincode"
  case faceIDAndPincode = "faceid_and_pincode"
  case noFaceIDAndPincode = "no_faceid_and_pincode"
  
  init?(scheme: String) {
    guard let value = UserDefaults.optionsAsDict()[scheme] else {
      return nil
    }
    self = value
  }
}

let UserAuthSetupDict = UserAuthSetup.allCases.reduce(into: [String: UserAuthSetup]()) {
  $0[$1.rawValue] = $1
}

extension UserDefaults {
    
  static func optionsAsDict() -> [String: UserAuthSetup] {
      return UserAuthSetupDict
  }
}



@objc(AppSetupModule)
class AppSetupModule: NSObject, RCTBridgeModule  {
  
  static func moduleName() -> String! {
    return "AppSetupModule"
  }
  
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  /**
    Method to call only after Biometric auth and the pincode value step of the
   */
  @objc static func isAppSeeded(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    do {
        guard try Account.defaultAccountSeeded() else {
          return reject(nil, "App Accound is Not Seeded Yet", nil)
        }
        return resolve(nil)
    } catch let error {
      return reject(nil, error.localizedDescription, nil)
    }
  }
  

  /**
    Method to call only after Biometric auth and the pincode value step of the
   */
  @objc static func setupAppWith(_ query: NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        
    do {
      guard let dict = query as? [String: Any] else {
        return reject(nil, "Erorr setupAppWith query object could not be inferred", nil)
      }
      guard let userAuthScheme = dict["user_auth_scheme"] as? String else {
        return reject(nil, "Missing key (user_auth_scheme) in setupAppWith query object", nil)
      }
      guard let userAuthScheme = UserAuthSetup(scheme: userAuthScheme) else {
        return reject(nil, "Key (user_auth_scheme) in setupAppWith query object", nil)
      }
      
      // Create account
      
      let account = try Account.seedDefaultAccount()
      
      var pinCode: String = ""
    
      // check for a pinCode or password
      if let code = dict["password"] as? String {
        pinCode = code
      } else if let pin = dict["pincode"] as? String {
        pinCode = pin
      }
      
      
      // Create mnemonic
      guard let mnemonic = try Seeds.generateMnemonic(saveOnInit: false, password: pinCode).value else {
        return reject(nil, "Error generateMnemonic(saveOnInit:) failed by either not returning .value or by failing to initalize a Seeds object", nil)
      }
      
      
      // Seed account
      try AddressManager._int.seedAllAvailableAddresses(for: account, mnemonic: mnemonic, password: pinCode)
      
      //Save pincode to keychain
      let _ = try KeychainHelper.saveUserPincode(
        code: pinCode,
        syncToCloud: false,
        useBioMetric: userAuthScheme == .faceIDNoPincode || userAuthScheme == .faceIDAndPincode
      )
      
      guard CoreDataManager.node.saveChanges() else {
        return reject(nil, "Error saving setupAppWith(query:) - saveChangesFailed", nil)
      }
      
      return resolve(["mnemonic": mnemonic])
      
    } catch let error {
      return reject(nil, error.localizedDescription, nil)
    }
  }
  
  
}
