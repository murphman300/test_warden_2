//
//  Biometrics.swift
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-23.
//

import Foundation
import LocalAuthentication
import PromiseKit

class FaceIdHandler {
  
  static let node = FaceIdHandler()
  
  func checkFaceID(reason: String) -> Promise<Void> {
    
    return Promise { seal in
      
      
      let context = LAContext()
      var error: NSError?

      if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
          let reason = "Please authenticate yourself"

          context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) {
              [weak self] success, authenticationError in

              DispatchQueue.main.async {
                  if success {
                    return seal.fulfill(Void())
                  } else {
                    return seal.reject(authenticationError ?? "Some error happened authenticating the user" as! Error)
                  }
              }
            
          }
        
      } else {
        return seal.fulfill(Void())
      }
      
    }
    
  }
  
}
