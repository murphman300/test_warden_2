//
//  Seeds+CoreDataClass.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-24.
//
//

import Foundation
import CoreData

@objc(Seeds)
public class Seeds: NSManagedObject {

  
  @objc override func handleBeforeSave() {
    super.handleBeforeSave()
    
    self.added_on = String(Date().timeIntervalSince1970)
  }
}
