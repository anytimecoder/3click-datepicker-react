var React = require('react');
var classNames = require('classnames');
var isDefined = require('check-defined');
/*
displays datepicker in three separate stages for:
1. Years
2000  2001  2002  2003  2004
2005  2006  2007  2008  2009
2010  2011  2012  2013  2014
2015  2016  2017  2018  2019

2. Months
January   February  March   April
May       June      July    August
September October November  December

3. Days
1   2   3   4   5   6   7
8   9   10  11  12  13  14
15  16  17  18  19  20  21
22  23  24  25  26  27  28
29  30  31
*/
var Datepicker = React.createClass({

	displayName: 'Datepicker',

	propTypes: {
    className: React.PropTypes.string,      // additional CSS class name for element
    disabled: React.PropTypes.bool,         // disable input field?
    name: React.PropTypes.string,           // name for the input field
    numberOfYears: React.PropTypes.number,  // number of years to display (last year would be startYear + numberOfYears)
    onBlur: React.PropTypes.func,           // onBlur handler: function(event) {}
		onChange: React.PropTypes.func,         // onChange handler: function(newValue) {}
		onFocus: React.PropTypes.func,          // onFocus handler: function(event) {}
		placeholder: React.PropTypes.string,    // default input placeholder value
    startYear: React.PropTypes.number       // starting value of the year to show to the user
	},

	getDefaultProps: function() {
		return {
      className: undefined,
      disabled: false,
      name: 'date',
      onBlur: undefined,
  		onChange: undefined,
  		onFocus: undefined,
  		placeholder: 'yyyy-mm-dd',
      startYear: 1982
		};
	},

	getInitialState: function() {
		return {
			isOpen: false,
      stage: 0,
			value: undefined,
			valueYear: undefined,
			valueMonth: undefined,
			valueDay: undefined
		};
	},

	selectYear: function(event) {
		if (isDefined(event, 'target.attributes.data-key')) {
			this.setState({
				valueYear: event.target.attributes['data-key'],
				stage: 1
			})
		}
	},
	buildTable: function(stage, data) {

	},
  buildSelectBox: function() {
		let i,
			rows = [],
			values = [],
			year = this.props.startYear;

		//show years
		if (this.state.stage === 0) {
			for (i = 0; i < 20; i++) {
				values.push(<td key={year} data-key={year} onClick={this.selectYear}>{year}</td>);
				year++;
				if (i > 0 && (i + 1) % 5 === 0) {
					rows.push(<tr key={i}>{values}</tr>);
					values = [];
				}
			}
			//last batch of values
			rows.push(<tr>{values}</tr>);
			return (
				<table>
					{rows}
				</table>
			)
		} else if (this.state.stage === 1) {

		}
  },

	handleMouseDown: function(event) {
		//do nothing is disabled
		if (this.props.disabled || this.state.isOpen) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();

		this.setState({
			isOpen: true
		});
	},

	render: function() {
		var classes = classNames('Datepicker', this.props.className, {
			'placeholder' : this.state.value
		});
		var value = this.state.value ? this.state.value : this.props.placeholder;
		var selectBox;

		if (this.state.isOpen) {
			selectBox = (
				<div ref="selectBoxContainer">
					<div>{this.buildSelectBox()}</div>
				</div>
			);
		}

		return (
			<div ref="dateContainer" className={classes} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
				<input type="date" ref="value" name={this.props.name} value={this.state.value} disabled={this.props.disabled} placeholder={this.props.placeholder} value={this.state.value}/>
				{selectBox}
			</div>
		);
	}

});

module.exports = Datepicker;
