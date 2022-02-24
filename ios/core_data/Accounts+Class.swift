//
//  Wallets+Class.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-15.
//
import CoreData
import Foundation


extension Address {
  
  static func populateFrom(dict: NSDictionary) -> Address? {
    
    guard let d = dict as? [String: Any] else {
      return nil
    }
    
    let n = NSEntityDescription.insertNewObject(forEntityName: "Wallet", into: CoreDataManager.node.managedObjectContext) as! Address
      
    n.id = d["id"] as? String ?? String.randomStringAlphaNumeric(length: 32)
    
    n.name = d["name"] as? String
    
    if let network = d["network"] as? String {
        
        n.network = network
        
    } else if let netDict = d["network"] as? [String: Any], let netId = netDict["key"] as? String {
    
        n.network = netId
    
    } else {
      return nil
    }
    
    n.value = d["address"] as? String
    
    return n
    
  }
  
}



// MARK: - Account Seeding


extension Account {
  
  
  
  
  
  
}
