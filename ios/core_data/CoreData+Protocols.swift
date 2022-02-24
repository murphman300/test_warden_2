//
//  CoreData+Protocols.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-23.
//

import Foundation
import CoreData


// MARK: Fetchable

protocol Fetchable where Self: NSManagedObject { }


extension Fetchable {
  
  
  static func all(in moc: NSManagedObjectContext) throws -> [Self] {
    let req = NSFetchRequest<Self>()
    req.entity = self.entity()

    return try moc.fetch(req)
  }
  
  static func fetch(query: String, value: String) throws -> [Self] {
    
    guard let thisName = Self.entity().name else { throw "NSManagedObject .fetch(query:name:) error - no name found" as! Error }
    
    let fetchRequest: NSFetchRequest<Self>
    fetchRequest = NSFetchRequest<Self>(entityName: thisName)
    
    fetchRequest.predicate = NSPredicate(format: query, value)
    
    do {
      let result = try CoreDataManager.node.managedObjectContext.fetch(fetchRequest)
      return result
    } catch let error {
      throw error
    }
    
  }
  
  static func fetchForOne(query: String, value: String) throws -> Self {
    do {
      let result = try Self.fetch(query: query, value: value)
      if result.count == 0 {
        throw "No results found for query \(query) and value \(value) for entity \(Self.self.entity().name)" as! Error
      }
      return result[0]
    } catch let error {
      throw error
    }
  }

}


extension NSManagedObject: Fetchable { }



//MARK: Dictionary methods


extension NSManagedObject {
  
  func toNsDict() -> NSDictionary {
    let keys = Array(self.entity.attributesByName.keys)
    return self.dictionaryWithValues(forKeys: keys) as NSDictionary
  }
  
  func deleteAll() throws {
    guard let n = self.entity.name else { return }
    guard n != "NSManagedObject" else { return }
    try CoreDataManager.node.deleteAll(entity: n)
  }
}
