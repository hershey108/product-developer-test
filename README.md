# Whitbread Product Developer Test - Solution

## Overview
This is a simple webpage that allows a user to search for a location, and retrieves upto 20 recommended venues nearby.
These results are displayed in a Google Map, with further details of the venues listed underneath.

## Approach
This is a simple implementation of the Foursquare API, not using OAuth as it is not hosted on a public url. I opted to use
the explore endpoint as recommended by the developer guide, as this would provide a list of popular venues.

Once I had access to the API, I decided the best way to display this information would be on a map, and so I included a
Google Map in the page. Using the Google Maps API, I was able to add markers to the map for each venue, and then below I
listed the relevant location and contact data for each venue.

## Running the web app
To run the application, simply load up foursquare.html in a browser. All references to local files are as the original script
(save a fix to the js path). Any additional libraries (jQuery, Google Maps) have been linked to their hosted files.
