"use strict";

// My application access tokens. Should really be kept safe on a server somewhere, but as I'm not hosting this, we'll
// keep it here for now.
var CLIENT_ID = "V31OGM1O0ETTABJHCXTMPFZVMPG0ZKRWJZKDVD5AAN4WKRS3";
var CLIENT_SECRET = "QGGZYCTYNEDC21AZ1I4VTT5BOVNWTKMDCCNOS5C0LJXF3GZE";

//Google Maps API key
var MAPS_KEY = "AIzaSyBc3hZuztE30zYq3SlG__KlhUlWheICXaA";

// The latest version of the Foursquare API I'm going to support (i.e. the day I'm writing this).
var VERSION = "20170513";

// The number of results I want per request.
var LIMIT = 20;


//Our global Google Maps object and Markers array
var MAP;
var MARKERS = [];


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

    google.maps.event.trigger(MAP, 'resize');

    if (!data.response.groups[0]) {
        handleFailure(data);
    }

    clearMarkers();

    var items = data.response.groups[0].items;

    for (var i = 0; i < items.length; i++) {
        var marker = new google.maps.Marker({
            position: items[i].venue.location.labeledLatLngs[0],
            map: MAP,
            title: items[i].venue.name,
            label: "" + (i+1)
        });

        MARKERS.push(marker);
    }

    google.maps.event.trigger(MAP, 'resize');
    if(MARKERS[0]) {
        MAP.setCenter(MARKERS[0].position);
    }
}

/**
 * Manage a failed result from the API, likely can't find the queried location.
 * @param data
 */
function handleFailure(data) {
    $("#map").hide();
    $("#search-error").show();
}

/**
 * Setup function that will initially load the Google Map into the page.
 */
function initMap() {

    // We don't actually care about the initial location, so we'll just use the one from the Maps tutorial.
    var uluru = {lat: -25.363, lng: 131.044};

    MAP = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: uluru
    });
}

function clearMarkers() {
    for (var i = 0; i < MARKERS.length; i++) {
        MARKERS[i].setMap(null);
    }

    MARKERS = [];
}

//On ready function - set up the page to work
$(function(){

    // Hook up the search box and button
    $("#search").click(function () {
        var query = $("#query").val();
        if (query) {
            search(query);
        }
    });

    $("#query").keyup(function(event){
        if(event.keyCode == 13){
            $("#search").click();
        }
    });
});