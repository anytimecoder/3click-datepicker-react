var React = require('react');

var DataTable = React.createClass({

	displayName: 'DataTable',

	propTypes: {
    data: React.PropTypes.array,
		columns: React.PropTypes.number,
		onClick: React.PropTypes.func
	},

	getDefaultProps: function() {
		return {
			data: [],
			columns: 5,
			onClick: function(event) {

			}
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
			data = this.props.data,
			year = this.props.startYear;

		for (i = 0; i < data.length; i++) {
			values.push(<td key={data[i]} data-key={data[i]} onClick={this.props.onClick}>{data[i]}</td>);
			year++;
			if (i > 0 && (i + 1) % this.props.columns === 0) {
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

module.exports = DataTable;
