//
//  Accounts.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-23.
//

import Foundation
import CoreData
import PromiseKit

let APP_SEEDED_ACCOUNT_NAME = "Account 1"


extension Account {
  
  
  static func createNewAccount(name: String, saveOnInit: Bool? = false) throws -> Account {
    
    let account = NSEntityDescription.insertNewObject(forEntityName: "Account", into: CoreDataManager.node.managedObjectContext) as! Account
    
    account.name = name
    
    account.id = String.randomStringAlphaNumeric(length: 32)
    
    account.saved_on = String(Date().timeIntervalSince1970)
    
    guard let shouldSaveOnInit = saveOnInit, shouldSaveOnInit else { return account }
    
    //MARK: - Seed all addresses for account
    guard CoreDataManager.node.saveChanges() else { throw "Account creation could not be saved" as! Error }
    
    return account
  }
  
  static func seedDefaultAccount() throws -> Account {
    
    do {
      return try Account.createNewAccount(name: APP_SEEDED_ACCOUNT_NAME)
    } catch let error {
      throw error
    }
    
  }
  
  static func defaultAccountSeeded() throws -> Bool {
    
    let check: Account?
    
    do {
      check = try Account.fetchForOne(query: "name == %@", value: APP_SEEDED_ACCOUNT_NAME)
    } catch let error {
      throw error
    }
    
    if check == nil {
      do {
          let checks = try Account.all(in: CoreDataManager.node.managedObjectContext)
          return checks.count > 0
      } catch let error {
        throw error
      }
    }
    
    return true
    
  }
  
}
