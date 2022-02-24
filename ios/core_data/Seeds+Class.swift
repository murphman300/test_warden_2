//
//  Seeds+Class.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-20.
//

import Foundation
import CoreData
import PromiseKit


extension Seeds {
  
  static func populateFrom(dict: NSDictionary) throws -> Seeds {
    
    guard let d = dict as? [String: Any] else {
      throw "Seed could not be infered as a dict" as! Error
    }
    
    guard let value = d["value"] as? String else {
      throw "No value key found in Seed dict, or its value could not be infered as a String" as! Error
    }
    
    let n = NSEntityDescription.insertNewObject(forEntityName: "Seeds", into: CoreDataManager.node.managedObjectContext) as! Seeds
      
    n.value = value
    
    n.name = d["name"] as? String ?? String.randomStringAlphaNumeric(length: 32)
    
    n.added_on = String(Date().timeIntervalSince1970)
    
    do {
      try n.saveToDisk()
    } catch let error {
      throw error
    }
//
    return n
    
  }
  
  static func populate(fromDict: NSDictionary) -> Promise<Seeds> {
    
    return Promise {seal in
      do {
        let n = try Seeds.populateFrom(dict: fromDict)
        return seal.fulfill(n)
      } catch let error {
        return seal.reject(error)
      }
    }
  }
  
  static func appProvidedMnemonic() -> String? {
    let fetch = Seeds.fetchRequest()
    
    fetch.predicate =  NSPredicate(format: "name == %@", "app_provided_mnemonic")
    
    var seeds: [Seeds] = []
    
    do {
      
      seeds = try CoreDataManager.node.managedObjectContext.fetch(fetch)
    
    } catch let error {
      print(error)
      return nil
    }
    
    return seeds[0].value
    
  }
  
  static func generateMnemonic(saveOnInit: Bool? = false, password: String? = "123456") throws -> Seeds {
    do {
      
      let newMnemonic = try MnemonicModule._generateBip32(password: password!)
      
      let n = NSEntityDescription.insertNewObject(forEntityName: "Seeds", into: CoreDataManager.node.managedObjectContext) as! Seeds
        
      n.value = newMnemonic
      
      //MARK: - Encrypt the mnemonic here
      
      n.name = "app_provided_mnemonic"
      
      n.added_on = String(Date().timeIntervalSince1970)
      
      if let save = saveOnInit, save {
        try n.saveToDisk()
      }
      
      return n
      
    } catch let error {
      throw error
    }
    
  }
  
  
  static func providedAppProvidedMnemonic() throws -> String {
    if let current = Seeds.appProvidedMnemonic() {
      return current
    }
    guard let seed = try Seeds.generateMnemonic(saveOnInit: true, password: nil).value else {
      throw "Unable to provide mnemonic value" as! Error
    }
    return seed
    
  }
  
  static func authorizeBioMetricForAppBasedMnemonic() -> Promise<String> {
    
    return Promise { seal in
      FaceIdHandler.node.checkFaceID(reason: "Unlock your device")
        .done { _ in
          do {
            let m = try Seeds.providedAppProvidedMnemonic()
            return seal.fulfill(m)
          } catch let error {
            return seal.reject(error)
          }
        }
        .catch{ err in
          return seal.reject(err)
        }
    }
    
  }
  
}
