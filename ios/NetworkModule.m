//
//  NetworkModule.m
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-10.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NetworkModule, NSObject)

RCT_EXTERN_METHOD(
                  availableNetworks: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
)

@end
//
//@interface RCT_EXTERN_MODULE(Mnemonic, NSObject)
//
//RCT_EXTERN_METHOD(
//                  generateBip32:(NSString *)what
//                  resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject
//)
//
//@end
