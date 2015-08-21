jest.dontMock('../Datepicker');
jest.dontMock('../DataTable');
jest.dontMock('check-defined');

var React = require('react/addons');
var Datepicker = require('../Datepicker');
var TestUtils = React.addons.TestUtils;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

describe('Datepicker', function() {

  var doc = TestUtils.renderIntoDocument( < Datepicker startYear={1982} numberOfYears={20} placeholder="111"/>);
  var input = TestUtils.findRenderedDOMComponentWithTag(doc, 'input');
  var dateContainer = React.findDOMNode(doc.refs.dateContainer);

  it('contains an input', function() {
    expect(input).toBeDefined();
  });
});

describe('clicking datepicker', function() {

  var doc = TestUtils.renderIntoDocument( < Datepicker startYear={1982} numberOfYears={20} placeholder="111"/>);
  var input = TestUtils.findRenderedDOMComponentWithTag(doc, 'input');
  var dateContainer = React.findDOMNode(doc.refs.dateContainer);

  TestUtils.Simulate.mouseDown(dateContainer);
  var tds = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'td');

  it('opens up year selection', function() {
    expect(tds.length).toEqual(20);
  });

  it('contains all years', function() {
    tds.forEach(function(item, index) {
      var value = React.findDOMNode(item).textContent;

      expect(value).toEqual((1982 + index).toString());
    });
  });
});

describe('clicking year 1982', function() {

  var doc = TestUtils.renderIntoDocument( < Datepicker startYear={1982} numberOfYears={20} placeholder="111"/>);
  var input = TestUtils.findRenderedDOMComponentWithTag(doc, 'input');
  var dateContainer = React.findDOMNode(doc.refs.dateContainer);

  TestUtils.Simulate.mouseDown(dateContainer);
  var tds = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'td');
  TestUtils.Simulate.click(React.findDOMNode(tds[0]));

  it('opens up month selection', function() {
    var tds = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'td');
    expect(tds.length).toEqual(12);
  });

  it('contains all months by default', function() {
    var tds = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'td');
    tds.forEach(function(item, index) {
      var value = React.findDOMNode(item).textContent;
      expect(value).toEqual(months[index]);
    });
  });
});

describe('clicking year 1982 and October', function() {

  var doc = TestUtils.renderIntoDocument( < Datepicker startYear={1982} numberOfYears={20} placeholder="111"/>);
  var input = TestUtils.findRenderedDOMComponentWithTag(doc, 'input');
  var dateContainer = React.findDOMNode(doc.refs.dateContainer);

  TestUtils.Simulate.mouseDown(dateContainer);
  var tds = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'td');
  TestUtils.Simulate.click(React.findDOMNode(tds[0]));
  tds = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'td');
  TestUtils.Simulate.click(React.findDOMNode(tds[9]));
  tds = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'td');

  it('has 31 days', function() {
    for (var i = 0; i < 31; i++) {
      var value = React.findDOMNode(tds[i]).textContent;
      expect(value).toEqual((i+1).toString());
    }
  });

});
