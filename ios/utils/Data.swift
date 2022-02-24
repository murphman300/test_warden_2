//
//  Data.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-11.
//
import Foundation

extension Data {
    public func toHexString() -> String {
        return reduce("", {$0 + String(format: "%02X ", $1)})
    }
}

