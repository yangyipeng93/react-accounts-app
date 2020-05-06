import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class Record extends Component {

    state = {}

    handleEdit = () => {

    }

    handleToggle = () => {


    }

    render() {
        return (
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleEdit}>Update</button>
                    <button className="btn btn-danger" onClick={this.handleToggle}>Cancel</button>
                </td>
            </tr>
        )
    }

}

Record.propTypes = {
    record: PropTypes.object
}
