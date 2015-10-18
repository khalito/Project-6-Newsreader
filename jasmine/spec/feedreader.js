/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds object and ensures
         * it has a URL defined and that the URL is not empty.
         */
         it('should have non-empty URLs', function() {
            // This is our test hypothesis
            var hasURL = true;
            // Loop through all the feeds and check whether a non-empty "url" property exists
            // If not, out test has failed
            for(var i = 0; i < allFeeds.length; i++) {
                if(!(allFeeds[i].url)) {
                    hasURL = false;
                }
            }

            expect(hasURL).toBe(true);
         });

        /* Loops through each feed in the allFeeds object and ensures
         * it has a name defined and that the name is not empty.
         */
         it('should have non-empty names', function() {
            // This is our test hypothesis
            var hasName = true;
            // Loop through all the feeds and check whether a non-empty "name" property exists
            // If not, out test has failed
            for(var i = 0; i < allFeeds.length; i++) {
                if(!(allFeeds[i].name)) {
                    hasName = false;
                }
            }

            expect(hasName).toBe(true);
         });
    });


    describe('The menu', function() {

         it('should be hidden by default', function() {
            // We set the "menu-hidden" class to hide the menu. Check whether it is set on body
            var isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBe(true);
         });

         it('should be visible after clicking on it', function() {
            // Let's click the menu icon...
            $('.menu-icon-link').trigger('click');
            // ...and check again whether the "menu-hidden" class is (still) set on body
            var isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBe(false);
         });

         it('should turn hidden after clicking on it again', function() {
            // Let's click the menu again...
            $('.menu-icon-link').trigger('click');
            // ...and check whether the "menu-hidden" class gone from body
            var isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBe(true);
         });
    });

    describe('Initial entries', function() {
        // Load the first feed asynchronously
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
         it('should not be empty', function() {
            var listOfEntries = $('.feed .entry'); // returns an array
            expect(listOfEntries.length).not.toBe(0);
         });

    });

    describe('New Feed Selection', function() {
        // Load the first feed asynchronously
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Ensures when a new feed is loaded by the loadFeed function that the content
         * actually changes.
         */
         it('should upate the content when selection a new feed', function() {
            // Store the text of the current entries in a variable
            var initialEntries = $('.feed .entry h2').text();
            var entriesAreDifferent = true; // This is our test hypothesis
            // Load the next feed
            loadFeed(1, function() {
                //Store the content of the new feed in a separate variable
                var newEntries = $('.feed .entry h2').text();
                // Compare the two text variables. If they are the same, our test has failed
                if(initialEntries == newEntries) {
                    entriesAreDifferent = false;
                }
                done();
            });
            expect(entriesAreDifferent).toBe(true);
         });

    });
}());
