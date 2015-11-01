var Browser = require("zombie");
var url = "http://localhost:7878/";
var browser = new Browser();

describe("gympal smoke tests", function() {

		it("should have defined headless browser", function(next){
        expect(typeof browser != "undefined").toBe(true);
        expect(browser instanceof Browser).toBe(true);
				next();
    });

    it("should visit the site and see the routine form", function(next) {
        browser.visit(url, function(err) {
            expect(browser.success).toBe(true);
						expect(browser.text('title')).toEqual('GymPal');
						expect(browser.html("body")).toContain("GymPal - Your fitness companion!");
						next();
        })
    });

		it("should visit the routines page", function(next) {
				browser.clickLink('Routines');
				expect(browser.html("body")).toContain("Routines");
				next();
    });

		it("remove exercise should remove exercise form from routine form", function(next) {
        browser.visit(url, function(err) {
						browser.pressButton('Remove exercise');
						expect(browser.html("body")).not.toContain("exerciseName");
						next();
        })
    });

		it("add exercise should add one exercise form to routine form", function(next) {
        browser.visit(url, function(err) {
						browser.pressButton('Add exercise');
						var numberOfRemoveButtons = browser.queryAll('.btn-danger').length;
						expect(numberOfRemoveButtons).toEqual(2);
						next();
        });
    });

		it("should add a routine without exercises", function(next) {
				browser.visit(url, function(err) {
					browser.fill('#name', 'name');
					browser.fill('#toughness', 100);
					browser.fill('#duration', 200);
					browser.pressButton('Remove exercise');
					browser.pressButton('Save routine');
					expect(browser.success).toBe(true);
					next();
				});
    });

		it("should add a routine", function(next) {
				browser.visit(url, function(err) {
					browser.fill('#name', 'name');
					browser.fill('#toughness', 100);
					browser.fill('#duration', 200);
					browser.fill('#exerciseName', 'exercise');
					browser.fill('#exerciseRepetitions', 200);
					browser.pressButton('Save routine');
					expect(browser.success).toBe(true);
					next();
				});
    });
});
