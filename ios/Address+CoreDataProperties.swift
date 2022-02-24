//
//  Address+CoreDataProperties.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-24.
//
//

import Foundation
import CoreData


extension Address {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Address> {
        return NSFetchRequest<Address>(entityName: "Address")
    }

    @NSManaged public var value: String?
    @NSManaged public var id: String?
    @NSManaged public var index: String?
    @NSManaged public var name: String?
    @NSManaged public var network: String?
    @NSManaged public var account: Account?

}
