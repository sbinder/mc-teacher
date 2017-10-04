/*!
 * ASP.NET SignalR JavaScript Library v2.2.2
 * http://signalr.net/
 *
 * Copyright (c) .NET Foundation. All rights reserved.
 * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies['classHub'] = this.createHubProxy('classHub'); 
        proxies['classHub'].client = { };
        proxies['classHub'].server = {
            hello: function () {
            /// <summary>Calls the Hello method on the server-side ClassHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['classHub'].invoke.apply(proxies['classHub'], $.merge(["Hello"], $.makeArray(arguments)));
             },

            progress: function (channel, stid, tid, taskid, rating, tcomment, scomment) {
            /// <summary>Calls the Progress method on the server-side ClassHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
            /// <param name=\"channel\" type=\"\">Server side type is System.UInt32</param>
            /// <param name=\"stid\" type=\"\">Server side type is System.UInt32</param>
            /// <param name=\"tid\" type=\"\">Server side type is System.UInt32</param>
            /// <param name=\"taskid\" type=\"\">Server side type is System.UInt32</param>
            /// <param name=\"rating\" type=\"Number\">Server side type is System.Int32</param>
            /// <param name=\"tcomment\" type=\"String\">Server side type is System.String</param>
            /// <param name=\"scomment\" type=\"String\">Server side type is System.String</param>
                return proxies['classHub'].invoke.apply(proxies['classHub'], $.merge(["Progress"], $.makeArray(arguments)));
             },

            send: function (channel, stid, status) {
            /// <summary>Calls the Send method on the server-side ClassHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
            /// <param name=\"channel\" type=\"\">Server side type is System.UInt32</param>
            /// <param name=\"stid\" type=\"\">Server side type is System.UInt32</param>
            /// <param name=\"status\" type=\"\">Server side type is System.Boolean</param>
                return proxies['classHub'].invoke.apply(proxies['classHub'], $.merge(["Send"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));