"use strict";

// My application access tokens. Should really be kept safe on a server somewhere, but as I'm not hosting this, we'll
// keep it here for now.
var CLIENT_ID = "V31OGM1O0ETTABJHCXTMPFZVMPG0ZKRWJZKDVD5AAN4WKRS3";
var CLIENT_SECRET = "QGGZYCTYNEDC21AZ1I4VTT5BOVNWTKMDCCNOS5C0LJXF3GZE";

// The latest version of the Foursquare API I'm going to support (i.e. the day I'm writing this).
var VERSION = "20170513";

/**
 * My search function, which will contact the foursquare API and then return the response.
 * @param location - The place I want to search.
 */
function search(location) {
    $.get({
        url: "https://api.foursquare.com/v2/venues/explore",
        data: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            near: location,
            v : VERSION
        },
        success: function(data) {
            console.log(data);
        },
        error: function (data) {
            console.log("Something went wrong");
            console.log(data);
        }
    });
}