//
//  String.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-16.
//

import Foundation

extension String {
  
  static func randomString(length: Int) -> String {
      let letters : NSString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%^&*()><?.,.~"
      let len = UInt32(letters.length)
      var randomString = ""
      for _ in 0 ..< length {
          let rand = arc4random_uniform(len)
          var nextChar = letters.character(at: Int(rand))
          randomString += NSString(characters: &nextChar, length: 1) as String
      }
      return randomString
  }
  
  static func randomStringAlphaNumeric(length: Int) -> String {
      let letters : NSString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      let len = UInt32(letters.length)
      var randomString = ""
      for _ in 0 ..< length {
          let rand = arc4random_uniform(len)
          var nextChar = letters.character(at: Int(rand))
          randomString += NSString(characters: &nextChar, length: 1) as String
      }
      return randomString
  }
  
}
