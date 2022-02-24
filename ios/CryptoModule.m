//
//  CryptoModule.m
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-11.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CryptoModule, NSObject)

RCT_EXTERN_METHOD(doEncrypt:(NSString) value
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
)

@end
