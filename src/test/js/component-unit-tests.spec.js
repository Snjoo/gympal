var testdom = require('testdom')('<html><body></body></html>');
var React = require('react');
var assert = require('assert');
var MainPage = require('../../../jsx/mainpage.js');
var TestUtils = React.addons.TestUtils;

// Simple tests to see whether the components are rendering correctly

describe('Exercises component', function() {

  before('render and locate element', function() {
    var exerciseList = [
      {name: "exercise1", additionalInfo: "info1", repetitions: 1, id: 1},
      {name: "exercise2", additionalInfo: "info2", repetitions: 2, id: 2}
    ];
    var renderedComponent = TestUtils.renderIntoDocument(
      <MainPage.Exercises exerciseList={exerciseList}/>
    );

    // Lets search for h3 so we can check the title is correct
    // Throws an exception if not found
    var titleComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'h3'
    );

    this.titleElement = inputComponent.getDOMNode();
  });

  it('title should be correct', function() {
    expect(titleElement.textContent).toEqual("Exercises");
  });


});

describe('RoutineForm component', function() {

  before('render and locate element', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <MainPage.RoutineForm />
    );

    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var titleComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'h1'
    );

    var textAreaComponents = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'form-control'
    );
    this.amountOfTextAreas = textAreaComponents.length;
    this.titleElement = titleComponent.getDOMNode();
  });

  it('title should be correct', function() {
    expect(this.titleElement.textContent).toEqual("GymPal - Your fitness companion!");
  });

  it('textarea should have form-control class', function() {
    expect(this.amountOfTextAreas).toBe(1);
  });

});
