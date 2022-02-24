//
//  CoreDataInterfaces.m
//  test_warden_2
//
//  Created by Jean-Louis Murphy on 2022-02-15.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AddressManager, NSObject)

RCT_EXTERN_METHOD(loadAddresses: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(getWalletWith: (NSString *)walletId
)

RCT_EXTERN_METHOD(getAddressWithPromise: (NSString *)walletId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
)

//RCT_EXTERN_METHOD(createAccount: (NSDictionary *)wallet
//                  resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject
//)

RCT_EXTERN_METHOD(getAllAddresses: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
)

@end
