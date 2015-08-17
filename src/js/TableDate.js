var React = require('react');

var TableDate = React.createClass({

	displayName: 'TableDate',

	propTypes: {
    data: React.PropTypes.object,
		kay: React.PropTypes.string
	},

	getDefaultProps: function() {
		return {
			data: undefined,
			key: undefined
		};
	},

	getInitialState: function() {
		return {
		};
	},

	render: function() {
		let i,
			rows = [],
			values = [],
			year = this.props.startYear;

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
		);
	}
});

module.exports = Datepicker;
