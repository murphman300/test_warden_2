//
//  Account+CoreDataProperties.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-24.
//
//

import Foundation
import CoreData


extension Account {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Account> {
        return NSFetchRequest<Account>(entityName: "Account")
    }

    @NSManaged public var name: String?
    @NSManaged public var id: String?
    @NSManaged public var saved_on: String?
    @NSManaged public var addresses: NSSet?

}

// MARK: Generated accessors for addresses
extension Account {

    @objc(addAddressesObject:)
    @NSManaged public func addToAddresses(_ value: Address)

    @objc(removeAddressesObject:)
    @NSManaged public func removeFromAddresses(_ value: Address)

    @objc(addAddresses:)
    @NSManaged public func addToAddresses(_ values: NSSet)

    @objc(removeAddresses:)
    @NSManaged public func removeFromAddresses(_ values: NSSet)

}
