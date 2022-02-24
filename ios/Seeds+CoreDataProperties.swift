//
//  Seeds+CoreDataProperties.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-24.
//
//

import Foundation
import CoreData


extension Seeds {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Seeds> {
        return NSFetchRequest<Seeds>(entityName: "Seeds")
    }

    @NSManaged public var added_on: String?
    @NSManaged public var name: String?
    @NSManaged public var value: String?
    @NSManaged public var account: Account?
    @NSManaged public var addresses: NSSet?

}

// MARK: Generated accessors for addresses
extension Seeds {

    @objc(addAddressesObject:)
    @NSManaged public func addToAddresses(_ value: Address)

    @objc(removeAddressesObject:)
    @NSManaged public func removeFromAddresses(_ value: Address)

    @objc(addAddresses:)
    @NSManaged public func addToAddresses(_ values: NSSet)

    @objc(removeAddresses:)
    @NSManaged public func removeFromAddresses(_ values: NSSet)

}
