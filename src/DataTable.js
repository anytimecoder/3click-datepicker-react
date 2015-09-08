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
		var rows = [],
			values = [],
			data = this.props.data,
			year = this.props.startYear;

		data.forEach(function(item, i) {
			values.push(<td key={item} onClick={this.props.onClick}>{item}</td>);
			year++;
			if (i > 0 && (i + 1) % this.props.columns === 0) {
				rows.push(<tr key={i}>{values}</tr>);
				values = [];
			}
		}.bind(this));
		//last batch of values
		rows.push(<tr key={data.length}>{values}</tr>);
		return (
			<table>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
});

module.exports = DataTable;