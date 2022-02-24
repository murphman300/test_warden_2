//
//  StructDecoder.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-15.
//

import Foundation
import CoreData

enum SerializationError: Error {

     // We only support structs

     case structRequired

     // The entity does not exist in the Core Data Model

     case unknownEntity

     // The provided type cannot be stored in core data

     case unsupportedSubType

}

protocol StructDecoder {

     // The name of our Core Data Entity

     static var EntityName: String { get }

     // Return an NSManagedObject with our properties set

     func toCoreData(context: NSManagedObjectContext) throws -> NSManagedObject

}


extension StructDecoder {
  
  func toCoreData(context: NSManagedObjectContext) throws -> NSManagedObject {

    let entityName = type(of:self).EntityName

    guard let desc = NSEntityDescription.entity(forEntityName: entityName, in: context) else { throw SerializationError.unknownEntity }


    let managedObject = NSManagedObject(entity: desc, insertInto: context)
    
    let mirror = Mirror(reflecting: self)


    guard mirror.displayStyle == .struct else { throw SerializationError.structRequired }


    for case let (label?, anyValue) in mirror.children {
        managedObject.setValue(anyValue, forKey: label)
    }

    return managedObject

  }

}


//extension NSDictionary: StructDecoder {
//  static var EntityName: String {
//    <#code#>
//  }
//  
//}
