import React from 'react'
import classNames from 'classnames'
import DataTable from'./DataTable'

/**
 * displays datepicker in three separate stages for:
 * 1. Years
 * 2000  2001  2002  2003  2004
 * 2005  2006  2007  2008  2009
 * 2010  2011  2012  2013  2014
 * 2015  2016  2017  2018  2019
 *
 * 2. Months
 * * * January   February  March   April
 * May       June      July    August
 * September October November  December
 *
 * 3. Days
 * 1   2   3   4   5   6   7
 * 8   9   10  11  12  13  14
 * 15  16  17  18  19  20  21
 * * 22  23  24  25  26  27  28
 * 29  30  31
 **/
class Datepicker extends Component {

	constructor(props) {
		super(props)
    this.state = {
      isOpen: false,
      stage: 0,
      value: undefined,
      valueYear: undefined,
      valueMonth: undefined,
      valueDay: undefined
    }
	}

	static propTypes = {
    className: React.PropTypes.string,      // additional CSS class name for element
    disabled: React.PropTypes.bool,         // disable input field?
		months: React.PropTypes.array, 					// array containing months (for use with other languages than English)
    name: React.PropTypes.string,           // name for the input field
    numberOfYears: React.PropTypes.number,  // number of years to display (last year would be startYear + numberOfYears)
    onBlur: React.PropTypes.func,           // onBlur handler: function(event) {}
		onChange: React.PropTypes.func,         // onChange handler: function(newValue) {}
		onFocus: React.PropTypes.func,          // onFocus handler: function(event) {}
		placeholder: React.PropTypes.string,    // default input placeholder value
    startYear: React.PropTypes.number       // starting value of the year to show to the user
	},

	static defaultProps = {
      disabled: false,
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      name: 'date ',
			numberOfYears: 20,
  		placeholder: 'yyyy-mm-dd',
      startYear: 1982
	},

	selectItem(event) {
		let value
		if (isDefined(event, 'target.textContent')) {
			value = event.target.textContent

			switch (this.state.stage) {
				case 0:
					this.setState({
						valueYear: value,
						stage: 1
					});
					break;
				case 1:
					this.setState({
						valueMonth: this.props.months.indexOf(value),
						stage: 2
					});
					break;
				case 2:

					this.setState({
						valueDay: value,
						stage: 0,
						isOpen : false,
						value: new Date(this.state.valueYear, this.state.valueMonth, value).toLocaleDateString()
					});
					break;
			}

		}
	},

	daysInMonth(year,month) {
			return new Date(year, month + 1, 0).getDate();
	},

	buildTable(stage, data) {

	},
  buildSelectBox() {
		var data = [],
			i;
		//show years
		switch (this.state.stage) {
			case 1:
				return <DataTable data={this.props.months} onClick={this.selectItem} columns={4}/>;
			case 2:
				for (i = 0; i < this.daysInMonth(this.state.valueYear, this.state.valueMonth); i++) {
					data[i] = i + 1;
				}
				return <DataTable data={data} onClick={this.selectItem} columns={8}/>;
			default:
				for (i = 0; i < this.props.numberOfYears; i++) {
					data[i] = this.props.startYear + i;
				}
				return <DataTable data={data} onClick={this.selectItem} />;
		}
  },

	handleMouseDown(event) {
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

	handleChange(event) {
     this.setState({value: event.target.value});
  },

	render() {
		var classes = classNames('Datepicker', this.props.className, {
			'placeholder' : this.state.value
		});
		var selectBox;

		if (this.state.isOpen) {
			selectBox = (
				<div ref="selectBoxContainer">
					<div>{this.buildSelectBox()}</div>
				</div>
			);
		}

		return (
			<div className={classes} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
				<input name={this.props.name} disabled={this.props.disabled} placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange}/>
				{selectBox}
			</div>
		);
	}

}

export default Datepicker
