//
//  Extensions.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-20.
//

import CoreData
import Foundation

extension NSManagedObject {
  
  @objc func handleBeforeSave() {
    return
  }
  
  func saveToDisk() throws {
    
    do {
      try CoreDataManager.node.saveChanges()
    } catch let error {
      throw error
    }
    
  }
  
}
