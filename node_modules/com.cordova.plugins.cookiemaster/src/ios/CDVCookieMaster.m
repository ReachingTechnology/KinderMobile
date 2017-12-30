//
//  CDVCookieMaster.m
//
//
//  Created by Kristian Hristov on 12/16/14.
//
//

#import "CDVCookieMaster.h"


@implementation CDVCookieMaster

- (void)getCookies:(CDVInvokedUrlCommand*)command
{
   CDVPluginResult* pluginResult = nil;
   NSString* urlString = [command.arguments objectAtIndex:0];

   if (urlString != nil) {
       NSArray* cookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookiesForURL:[NSURL URLWithString:urlString]];


       __block NSMutableDictionary* json = [NSMutableDictionary dictionary];

       [cookies enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
           NSHTTPCookie *cookie = obj;

           [json setObject:cookie.value forKey:cookie.name];

       }];

       NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:NSJSONWritingPrettyPrinted error:nil];

       NSString* jsonString=[[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

       if (jsonString != nil) {
           pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:jsonString];
       } else {
           pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"No cookie found"];
       }

   } else {
       pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"URL was null"];
   }
   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setCookies:(CDVInvokedUrlCommand*)command
{
   [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];

   CDVPluginResult* pluginResult = nil;
   NSString* urlString = [command.arguments objectAtIndex:0];
   NSDictionary* jsonCookies = [command.arguments objectAtIndex:1];

    NSEnumerator *enumerator = [jsonCookies keyEnumerator];
    NSCalendar *cal = [NSCalendar currentCalendar];
    NSArray* cookies;
    NSMutableDictionary *cookieProperties;

    NSHTTPCookie *cookie;
    NSHTTPCookieStorage *storage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    NSURL *url = [[NSURL alloc] initWithString:urlString];
    NSDate *expiry = [cal dateByAddingUnit:NSCalendarUnitMonth value:3 toDate:[NSDate date] options:0];
    id key;

    while ((key = [enumerator nextObject])) {

        cookieProperties = [NSMutableDictionary dictionary];
        [cookieProperties setObject:key forKey:NSHTTPCookieName];
        [cookieProperties setObject:jsonCookies[key] forKey:NSHTTPCookieValue];
        [cookieProperties setObject:urlString forKey:NSHTTPCookieOriginURL];
        [cookieProperties setObject:@"/" forKey:NSHTTPCookiePath];
        [cookieProperties setObject:expiry forKey:NSHTTPCookieExpires   ];

        cookie = [NSHTTPCookie cookieWithProperties:cookieProperties];
        [storage setCookie:cookie];

    }

    cookies = [NSArray arrayWithObjects:cookie, nil];
    [storage setCookies:cookies forURL:url mainDocumentURL:nil];

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Cookies have been set"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

 - (void)getCookieValue:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* urlString = [command.arguments objectAtIndex:0];
    __block NSString* cookieName = [command.arguments objectAtIndex:1];

    if (urlString != nil) {
        NSArray* cookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookiesForURL:[NSURL URLWithString:urlString]];
        __block NSString *cookieValue;

        [cookies enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
            NSHTTPCookie *cookie = obj;

            if([cookie.name isEqualToString:cookieName])
            {
                cookieValue = cookie.value;
                *stop = YES;
            }
        }];
        if (cookieValue != nil) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"cookieValue":cookieValue}];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"No cookie found"];
        }

    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"URL was null"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

 - (void)setCookieValue:(CDVInvokedUrlCommand*)command
{
    [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];

    CDVPluginResult* pluginResult = nil;
    NSString* urlString = [command.arguments objectAtIndex:0];
    NSString* cookieName = [command.arguments objectAtIndex:1];
    NSString* cookieValue = [command.arguments objectAtIndex:2];

    NSMutableDictionary *cookieProperties = [NSMutableDictionary dictionary];
    [cookieProperties setObject:cookieName forKey:NSHTTPCookieName];
    [cookieProperties setObject:cookieValue forKey:NSHTTPCookieValue];
    [cookieProperties setObject:urlString forKey:NSHTTPCookieOriginURL];
    [cookieProperties setObject:@"/" forKey:NSHTTPCookiePath];

    NSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:cookieProperties];
    [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];

    NSArray* cookies = [NSArray arrayWithObjects:cookie, nil];

    NSURL *url = [[NSURL alloc] initWithString:urlString];
    [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookies:cookies forURL:url mainDocumentURL:nil];

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Set cookie executed"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)clearCookies:(CDVInvokedUrlCommand*)command
{
    NSHTTPCookie *cookie;
    NSHTTPCookieStorage *storage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    for (cookie in [storage cookies]) {
        [storage deleteCookie:cookie];
    }

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
