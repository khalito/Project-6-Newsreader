/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
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

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
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


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('should be hidden by default', function() {
            // We set the "menu-hidden" class to hide the menu. Check whether it is set on body
            var isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBe(true);
         });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('should be visible after clicking on it', function() {
            // Let's click the menu icon...
            $('.menu-icon-link').trigger('click');
            // ...and check again whether the "menu-hidden" class is (still) set on body
            var isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBe(false);
         });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial entries', function() {
        // Load the first feed asynchronously
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

         /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('should not be empty', function() {
            var listOfEntries = $('.feed .entry'); // returns an array
            expect(listOfEntries.length).not.toBe(0);
         });

    });

    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        // Load the first feed asynchronously
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
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
