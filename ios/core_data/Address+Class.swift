//
//  Address+Class.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-24.
//

import Foundation
import CoreData


extension Address {
  
  static func saveWith(name: String, network: String, createResponse: CreateAddressResponse, account: Account) -> Address {
    
    let address = NSEntityDescription.insertNewObject(forEntityName: "Address", into: CoreDataManager.node.managedObjectContext) as! Address
    
    address.value = createResponse.address
    
    address.id = String.randomStringAlphaNumeric(length: 32)
    
    address.name = name
    
    address.network = network
    
    address.account = account
    
    return address
  
  }
  
}
