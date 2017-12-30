//
//  CDVCookieMaster.h
//
//
//  Created by Kristian Hristov on 12/16/14.
//
//

#import <Cordova/CDVPlugin.h>

@interface CDVCookieMaster : CDVPlugin

- (void)getCookies:(CDVInvokedUrlCommand*)command;
- (void)setCookies:(CDVInvokedUrlCommand*)command;
- (void)getCookieValue:(CDVInvokedUrlCommand*)command;
- (void)setCookieValue:(CDVInvokedUrlCommand*)command;
- (void)clearCookies:(CDVInvokedUrlCommand*)command;

@end
