import React from 'react'

class DataTable extends Component{

	static propTypes = {
    data: React.PropTypes.array,
		columns: React.PropTypes.number,
		onClick: React.PropTypes.func
	},

	static defaultProps = {
			data: [],
			columns: 5,
	},

	render() {
		let rows = [],
			values = [],
		  data = this.props.data,
			year = this.props.startYear;

		data.forEach((item, i) => {
			values.push(<td key={item} onClick={this.props.onClick}>{item}</td>);
			year++;
			if (i > 0 && (i + 1) % this.props.columns === 0) {
				rows.push(<tr key={i}>{values}</tr>);
				values = [];
			}
		});
		//last batch of values
		rows.push(<tr key={data.length}>{values}</tr>);

		return (
			<table>
				<tbody>
					{this.buildControlRow()}
					{rows}
				</tbody>
			</table>
		);
	}
}

module.exports = DataTable;
