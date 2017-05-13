"use strict";

// My application access tokens. Should really be kept safe on a server somewhere, but as I'm not hosting this, we'll
// keep it here for now.
var CLIENT_ID = "V31OGM1O0ETTABJHCXTMPFZVMPG0ZKRWJZKDVD5AAN4WKRS3";
var CLIENT_SECRET = "QGGZYCTYNEDC21AZ1I4VTT5BOVNWTKMDCCNOS5C0LJXF3GZE";

// The latest version of the Foursquare API I'm going to support (i.e. the day I'm writing this).
var VERSION = "20170513";

// The number of results I want per request.
var LIMIT = 20

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
            v : VERSION,
            limit: LIMIT
        },
        success: function(data) {
            console.log(data);

            showResults(data);
        },
        error: function (data) {
            console.log("Something went wrong");
            console.log(data);

            handleFailure(data);
        }
    });
}

/**
 * Visualise the results returned from Foursquare
 * @param data
 */
function showResults(data) {
    $("#search-error").hide();
    $("#map").show();
}

/**
 * Manage a failed result from the API, likely can't find the queried location.
 * @param data
 */
function handleFailure(data) {
    $("#map").hide();
    $("#search-error").show();
}

//On ready function - set up the page to work
$(function(){

    // Hook up the search box and button
    $("#search").click(function () {
        var query = $("#query").val();
        if (query) {
            search(query);
        }
    })
});